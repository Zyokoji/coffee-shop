import { supabase } from "../data/supabase.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ?
  header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "You need to log in first" });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: "Your login expired or is not valid. Log in again." });
  }

  //console.log(token);

  req.user = data.user;
  next();
}

