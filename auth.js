// Supabase auth bootstrap for static site role-based UI
// Replace the placeholders below with your actual project values.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = 'https://abjulxmjwoiuvqbjrfzj.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFianVseG1qd29pdXZxYmpyZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTAyMDQsImV4cCI6MjA3NzIyNjIwNH0.UU1COSjZuC_klKRiDYOzth7_qEn9JI8z_Kz7aXZ3sxI';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getRoles() {
  const { data: { session } } = await supabase.auth.getSession();
  const roles = session?.user?.app_metadata?.roles ?? [];
  return { session, roles };
}

export async function applyRoleUI() {
  const { session, roles } = await getRoles();
  const isAdmin = roles.includes('admin');
  const isMod = roles.includes('moderator');
  const isAuthed = Boolean(session);

  const adminEls = document.querySelectorAll('[data-link-admin]');
  const modEls = document.querySelectorAll('[data-link-mod]');
  const guestOnly = document.querySelectorAll('[data-guest-only]');
  const authedOnly = document.querySelectorAll('[data-authed-only]');

  adminEls.forEach(el => el.style.display = isAdmin ? '' : 'none');
  modEls.forEach(el => el.style.display = (isAdmin || isMod) ? '' : 'none');
  guestOnly.forEach(el => el.style.display = isAuthed ? 'none' : '');
  authedOnly.forEach(el => el.style.display = isAuthed ? '' : 'none');
}

// Simple demo auth helpers; replace with a real UI later if desired
export const supabaseAuth = {
  login: async () => {
    const email = prompt('Email:');
    const password = prompt('Password:');
    if (!email || !password) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    await applyRoleUI();
  },
  signup: async () => {
    const email = prompt('Email for sign up:');
    const password = prompt('Password:');
    if (!email || !password) return;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message); else alert('Check your email to confirm.');
  },
  logout: async () => { await supabase.auth.signOut(); await applyRoleUI(); }
};

// Keep UI synced
applyRoleUI();
supabase.auth.onAuthStateChange(applyRoleUI);


