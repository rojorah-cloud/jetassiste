export const WHATSAPP_NUMBER = "261349012159";
export const WHATSAPP_GREETING = "Bonjour Aina";
export const CONTACT_EMAIL = "contact@jetassiste.com";

export function isCoachsIdentityValid(firstName: string, email: string) {
  return firstName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
