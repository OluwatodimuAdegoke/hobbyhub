import { createClient } from "@supabase/supabase-js";
const URL = "https://ojzuzhtxnkcujtmujdqr.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qenV6aHR4bmtjdWp0bXVqZHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NTcxODMsImV4cCI6MjA0NjQzMzE4M30.EYJ1pAsq-7fUW3eb0ACLk2Stfl9-SpI931vgueZDKpA";
const supabase = createClient(URL, API_KEY);

export default supabase;
