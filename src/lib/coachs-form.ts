export function isCoachsIdentityValid(firstName: string, email: string) {
  return firstName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}