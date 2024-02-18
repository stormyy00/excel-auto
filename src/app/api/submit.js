const handler = async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ message: "Only POST requests are allowed" });
    }

    const body = req.body;

    // Create a Google Auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    // Create a Google Sheets API client
    const sheets = google.sheets({ auth, version: "v4" });

    // Prepare data for appending
    const values = [[body.name, body.diff, body.status, body.comm]];

    // Make API call to append data to the specified range in the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:D1", // Update the range as needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    // Log the response during development
    console.log(response.data);

    // Return success response
    return res.status(200).json({ data: response.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Whoops, something failed" });
  }
};

export default handler;
