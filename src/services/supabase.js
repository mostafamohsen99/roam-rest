import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mbylputcuqddiaguwjrx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieWxwdXRjdXFkZGlhZ3V3anJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDY1NTg4MCwiZXhwIjoyMDcwMjMxODgwfQ.9StmD43zUcquVTPLPGjQDaNu9mTumpa_50NvSSc1jLE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
