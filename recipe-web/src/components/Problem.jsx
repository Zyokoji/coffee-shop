import { API_URL } from "../api.js";

// Every planned failure gets a plain-English explanation and a next step.
export default function Problem({ problem, onRetry }) {
  const thisSite = window.location.origin;
  const apiIsLocal = API_URL?.startsWith("http://localhost");

  if (problem.kind === "missing-url") {
    return (
      <div className="problem">
        <h2>VITE_API_URL is not set</h2>
        <p>This site was built without knowing where the API lives.</p>
        <ol>
          <li>
            On vercel.com, open your <b>recipe-web</b> project, then Settings, Environment Variables.
          </li>
          <li>
            Add <code>VITE_API_URL</code> with your API address, for example{" "}
            <code>https://recipe-api-yourname.vercel.app</code> (no slash at the end).
          </li>
          <li>
            Redeploy the site: in the recipe-web folder run <code>npx vercel --prod</code>.
          </li>
        </ol>
        <p className="hint">Why? Vite pastes VITE_ values in when it builds. No value at build time means no value, ever, until the next build.</p>
      </div>
    );
  }

  if (problem.kind === "unreachable") {
    return (
      <div className="problem">
        <h2>Could not reach the API</h2>
        <p>
          Your browser could not read an answer from <code>{API_URL}</code>.
        </p>
        <ol>
          {apiIsLocal ? (
            <>
              <li>
                <b>Is the API running?</b> In the recipe-api terminal, run <code>npm run dev</code>. You should see{" "}
                <code>Galley open at http://localhost:3000</code>.
              </li>
              <li>
                <b>CORS?</b> Open DevTools (F12), Console tab. If it mentions CORS, add <code>{thisSite}</code> to{" "}
                <code>CORS_ORIGINS</code> in recipe-api's <code>.env</code>, then restart the API.
              </li>
            </>
          ) : (
            <>
              <li>
                <b>CORS?</b> Open DevTools (F12), Console tab. If it mentions CORS, the API's guest list is missing this
                site. In your <b>recipe-api</b> project on Vercel, edit <code>CORS_ORIGINS</code> and add exactly{" "}
                <code>{thisSite}</code>. Then redeploy the API: in the recipe-api folder run <code>npx vercel --prod</code>.
              </li>
              <li>
                <b>Typo in the address?</b> Open <code>{API_URL}/api/health</code> in a new tab. You should see JSON.
              </li>
            </>
          )}
        </ol>
        <button onClick={onRetry}>Try again</button>
      </div>
    );
  }

  if (problem.kind === "not-json") {
    return (
      <div className="problem">
        <h2>That address is not the API</h2>
        <p>
          <code>{API_URL}</code> answered, but with a web page instead of JSON. Check that VITE_API_URL is your{" "}
          <b>API's</b> address (recipe-api), not this website's address (recipe-web). Fix it, then redeploy.
        </p>
        <button onClick={onRetry}>Try again</button>
      </div>
    );
  }

  return (
    <div className="problem">
      <h2>The API answered with an error</h2>
      <p>{problem.message}</p>
      <p className="hint">The connection works. Check the API's logs (on Vercel: your recipe-api project, Logs).</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
}
