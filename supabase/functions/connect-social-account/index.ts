
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user) throw new Error("User not authenticated");

    const { platform } = await req.json();

    // In a real implementation, you would generate OAuth URLs for each platform
    // For now, we'll return a placeholder URL
    const authUrls = {
      instagram: `https://api.instagram.com/oauth/authorize?client_id=${Deno.env.get('INSTAGRAM_CLIENT_ID')}&redirect_uri=${Deno.env.get('INSTAGRAM_REDIRECT_URI')}&scope=user_profile,user_media&response_type=code&state=${user.id}`,
      twitter: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${Deno.env.get('TWITTER_CLIENT_ID')}&redirect_uri=${Deno.env.get('TWITTER_REDIRECT_URI')}&scope=tweet.read%20users.read&state=${user.id}`,
      youtube: `https://accounts.google.com/oauth2/auth?response_type=code&client_id=${Deno.env.get('YOUTUBE_CLIENT_ID')}&redirect_uri=${Deno.env.get('YOUTUBE_REDIRECT_URI')}&scope=https://www.googleapis.com/auth/youtube.readonly&state=${user.id}`,
      linkedin: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${Deno.env.get('LINKEDIN_CLIENT_ID')}&redirect_uri=${Deno.env.get('LINKEDIN_REDIRECT_URI')}&scope=r_liteprofile%20r_emailaddress&state=${user.id}`,
      facebook: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${Deno.env.get('FACEBOOK_CLIENT_ID')}&redirect_uri=${Deno.env.get('FACEBOOK_REDIRECT_URI')}&scope=pages_read_engagement,pages_read_user_content&state=${user.id}`
    };

    const authUrl = authUrls[platform as keyof typeof authUrls];
    if (!authUrl) {
      throw new Error(`Platform ${platform} not supported`);
    }

    return new Response(JSON.stringify({ authUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
