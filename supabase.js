import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgqdhencetroqjbzitfl.supabase.co";
const supabaseAnonKey = "sb_publishable_Su60RGRB8xf-i327v9DLuw_U7YNmvgb";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
