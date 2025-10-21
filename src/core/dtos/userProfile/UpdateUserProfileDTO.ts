export interface UpdateUserProfileDTO {
  profile_type?: 'psr' | 'volunteer' | 'ong' | 'company' | 'public_institution';
  profile_photo?: string | null;
  bio?: string | null;
  city?: string | null;
  state?: string | null;
}