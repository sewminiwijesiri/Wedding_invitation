import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-supabase-project")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit RSVP details to Supabase database
 */
export async function submitRsvpToSupabase({ name, attending, guests, message }) {
  if (!isSupabaseConfigured || !supabase) {
    console.warn("Supabase is not configured yet. Saving to localStorage only.");
    return { success: false, isConfigured: false, error: "Supabase credentials missing" };
  }

  try {
    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          name: name.trim(),
          attending: attending === "yes",
          guests: parseInt(guests, 10) || 1,
          message: message?.trim() || null,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting RSVP into Supabase:", error);
      return { success: false, isConfigured: true, error: error.message };
    }

    return { success: true, isConfigured: true, data };
  } catch (err) {
    console.error("Unexpected error submitting RSVP:", err);
    return { success: false, isConfigured: true, error: err.message };
  }
}

/**
 * Fetch guest wishes / guestbook messages from Supabase
 */
export async function fetchWishesFromSupabase(limit = 20) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, isConfigured: false, data: [] };
  }

  try {
    const { data, error } = await supabase
      .from("rsvps")
      .select("id, name, message, created_at, attending")
      .not("message", "is", null)
      .neq("message", "")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching wishes from Supabase:", error);
      return { success: false, isConfigured: true, data: [] };
    }

    return { success: true, isConfigured: true, data: data || [] };
  } catch (err) {
    console.error("Unexpected error fetching wishes:", err);
    return { success: false, isConfigured: true, data: [] };
  }
}

/**
 * Fetch all RSVPs for Admin Dashboard
 */
export async function fetchAdminRsvpList() {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, isConfigured: false, data: [] };
  }

  try {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching admin list from Supabase:", error);
      return { success: false, isConfigured: true, error: error.message, data: [] };
    }

    return { success: true, isConfigured: true, data: data || [] };
  } catch (err) {
    console.error("Unexpected error fetching admin list:", err);
    return { success: false, isConfigured: true, error: err.message, data: [] };
  }
}

/**
 * Delete RSVP entry by ID (Admin Action)
 */
export async function deleteRsvpRecord(id) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, isConfigured: false, error: "Supabase not configured" };
  }

  try {
    const { error } = await supabase
      .from("rsvps")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting RSVP:", error);
      return { success: false, isConfigured: true, error: error.message };
    }

    return { success: true, isConfigured: true };
  } catch (err) {
    console.error("Unexpected error deleting RSVP:", err);
    return { success: false, isConfigured: true, error: err.message };
  }
}
