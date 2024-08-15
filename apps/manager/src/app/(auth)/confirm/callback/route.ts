import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "~/utils/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (data.session) {
      await supabase.auth.setSession({
        access_token: data.session?.access_token,
        refresh_token: data.session.refresh_token,
      });
    }
    // headers().set("authorization", `${data.session?.access_token}`); // set the token
    console.log("Server Auth Error: ", error, data);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  // if (type === "invite")
  return NextResponse.redirect(`${origin}/auth/link-error`);
}
