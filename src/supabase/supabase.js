import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://udxllzflfminubvraulg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeGxsemZsZm1pbnVidnJhdWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjczMzIsImV4cCI6MjA2NTkwMzMzMn0.o3yz8Uc6v2jw6TyS1LuWykHfnNtpCSWL5XLrvrx8tEo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);