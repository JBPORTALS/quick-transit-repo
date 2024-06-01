import type { EmailOtpType } from "@supabase/auth-js";
import { NextResponse } from "next/server";

import { createClient } from "~/utils/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const token = searchParams.get("token");
  const type = searchParams.get("type") as EmailOtpType;
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (token_hash) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    console.log("Server Auth Error: ", error);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  // if (type === "invite")
  return NextResponse.redirect(`${origin}/auth/invite-error`);
}
