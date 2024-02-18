"use client";
import React, { useState } from "react";
import submit from "../app/api/submit.js";
const Landing = () => {
  const [name, setName] = useState();
  const [diff, setDiff] = useState();
  const [status, setStatus] = useState();
  const [comm, setComm] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      name,
      diff,
      status,
      comm,
    };

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await response.json();
    // alert(content.data.tableRange);

    console.log(form);
  };

  return (
    <div className="w-full bg-gray-600">
      Landing
      <form onSubmit={handleSubmit} className="py-4 space-y-4 mx-auto">
        <div className="flex flex-col justify-center items-center gap-3">
          <label htmlFor="problem">Problem</label>
          <input
            id="problem"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-40 h-10"
            placeholder="Problem"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <label htmlFor="difficulty">Difficulty</label>
          <input
            id="difficulty"
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
            type="text"
            className="w-40 h-10"
            placeholder="Difficulty"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="text"
            className="w-40 h-10"
            placeholder="Status"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            value={comm}
            onChange={(e) => setComm(e.target.value)}
            type="text"
            className="w-40 h-20"
            placeholder="Comments"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <button
            type="submit"
            className="w-20 h-10 bg-blue-400 rounded-xl py-2 px-4 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Landing;
