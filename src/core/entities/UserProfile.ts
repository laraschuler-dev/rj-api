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

  // Exemplo de método de domínio
  updateProfile(data: Partial<Omit<UserProfile, 'user_id' | 'id' | 'created_at' | 'updated_at'>>) {
    if (data.profile_type) this.profile_type = data.profile_type;
    if (data.profile_photo !== undefined) this.profile_photo = data.profile_photo;
    if (data.bio !== undefined) this.bio = data.bio;
    if (data.city !== undefined) this.city = data.city;
    if (data.state !== undefined) this.state = data.state;
  }
}