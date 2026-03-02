import axios from "axios";
import { getUser } from "./getUser";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";

export async function refreshToken() {
  const user = await getUser();
  const endpoint = `${BASE_URL}auth/v1/token?grant_type=refresh_token`;
  const { data } = await axios.post(
    endpoint,
    { refresh_token: user.refresh_token },
    {
      headers: {
        apikey: SUPABASE_API_KEY,
      },
    },
  );

  const {
    refresh_token,
    expires_at,
    access_token,
    user: { id: user_id },
  } = data;
  localStorage.setItem(
    "user",
    JSON.stringify({ refresh_token, expires_at, access_token, user_id }),
  );
  return access_token;
}
