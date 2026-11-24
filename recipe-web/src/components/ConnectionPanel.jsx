import { useState } from "react";
import { API_URL } from "../api.js";

// Shows both ends of the connection, so you can SEE what each env var is set to.
export default function ConnectionPanel({ health, status }) {
  const thisSite = window.location.origin;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(thisSite);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked. Selecting the text by hand still works.
    }
  }

  return (
    <section className="conn">
      <div className="conn-row">
        <span className="label">This website (its origin)</span>
        <code>{thisSite}</code>
        <button className="ghost" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="conn-row">
        <span className="label">API address (VITE_API_URL)</span>
        <code>{API_URL ?? "not set"}</code>
        <span className={`dot ${status}`} title={status} />
      </div>
      {health && (
        <div className="conn-row facts">
          <span className="label">API says</span>
          <span className="pill">running on: {health.runningOn}</span>
          <span className="pill">database: {health.database}</span>
          <span className="pill">CORS allows: {health.corsOrigins.join(", ")}</span>
        </div>
      )}
    </section>
  );
}
