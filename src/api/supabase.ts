import { createClient } from "@supabase/supabase-js";


// create-react-appを利用しているため環境変数は`REACT_APP_`のプレフィックスが必要
// https://create-react-app.dev/docs/adding-custom-environment-variables/
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);