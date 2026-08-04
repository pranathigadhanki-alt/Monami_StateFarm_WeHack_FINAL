import { supabase } from "./supabase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type SurveyPayload = {
  zipcode: string;
  yearBuilt: string;
  homeValue: string;
  homeType: string;
  safetyFeatures: string;
};

async function authFetch(path: string, init?: RequestInit) {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Missing auth session");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const body = await response.json();
      message = body.error || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  return response.json();
}

export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/home`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) throw error;
  return data;
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function saveSurvey(data: SurveyPayload) {
  return authFetch("/survey/me", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getSurvey(_userId?: string) {
  return authFetch("/survey/me/latest");
}

export async function saveRiskScore(_data?: unknown) {
  return authFetch("/risk-scores/recalculate", { method: "POST" });
}

export async function getRiskScore(_userId?: string) {
  return authFetch("/risk-scores/me/latest");
}

export async function getRecommendations(_userId?: string) {
  return authFetch("/renewal-suggestions/me");
}

export async function getPolicy() {
  return authFetch("/policies/me");
}

export async function getUserProfile() {
  return authFetch("/user-profile/me");
}

export async function getProgress() {
  return authFetch("/progress/me");
}

export async function saveProgress(exhibitsCompleted: number) {
  return authFetch("/progress/me", {
    method: "PUT",
    body: JSON.stringify({ exhibitsCompleted }),
  });
}
