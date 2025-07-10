export class UserProfile {
  constructor(
    public user_id: number,
    public profile_type: 'psr' | 'volunteer' | 'ong' | 'company' | 'public_institution',
    public profile_photo: string | null = null,
    public bio: string | null = null,
    public city: string | null = null,
    public state: string | null = null,
    public created_at?: Date,
    public updated_at?: Date,
    public id?: number
  ) {}
}