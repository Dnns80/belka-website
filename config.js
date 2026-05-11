// Public Supabase config — anon key is safe to ship (RLS only allows
// INSERT into waitlist_emails for the anon role). Same project as the
// in-app analytics; the waitlist lives in its own table.
window.BELKA_CONFIG = {
  SUPABASE_URL: "https://ygmcowvzijluptfjlfje.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_OMJX8jYfyO9BTMnEYfp0lg_etoabgiv",
  WAITLIST_TABLE: "waitlist_emails"
};
