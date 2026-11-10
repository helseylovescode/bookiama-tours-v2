import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getAuthenticatedOwner() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError && userError.name !== "AuthSessionMissingError") {
    console.error("[admin.auth.getUser]", userError.message);
    throw new Error("Could not verify the current user.");
  }

  if (!user) return null;

  const { data: isOwner, error: ownerError } = await supabase.rpc("is_bokiama_owner");

  if (ownerError) {
    console.error("[admin.auth.is_bokiama_owner]", ownerError.message);
    throw new Error("Could not verify admin permissions.");
  }

  return isOwner ? supabase : null;
}
