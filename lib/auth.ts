import { RegistrationFields } from "@/types/auth.type";
import { supabaseClient } from "./supabase/client";

export async function handleRegistration(formData: RegistrationFields) {
  const supabase = await supabaseClient();

  const { email, firstname, lastname, role, password } = formData;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) throw new Error("No user ID returned from Supabase");

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    firstname,
    lastname,
    role,
  });

  if (profileError) throw profileError;

  return authData.user;
}

export async function handleLogin(formData: {
  email: string;
  password: string;
}) {
  const supabase = await supabaseClient();
  const { email, password } = formData;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
}

export async function getCurrentProfile() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return { profile, supabase };
}
