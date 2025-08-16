"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [streamRes, setStreamRes] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log(data, "data");

      setResponse(data.response);
      setLoading(false);
    } catch (error) {
      setResponse("Error" + error.message);
    }
  };
  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your awesome message"
        rows={4}
      ></textarea>
      <div>
        <button onClick={handleChat}>{loading ? "Loading..." : "Chat"}</button>
      </div>
      <div>{response}</div>
    </div>
  );
}
