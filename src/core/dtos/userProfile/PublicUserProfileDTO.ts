// src/core/dtos/userProfile/PublicUserProfileDTO.ts
export class PublicUserProfileDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly profile: {
      profile_type?: string | null;
      translated_type?: string;
      profile_photo?: string | null;
      bio?: string | null;
      city?: string | null;
      state?: string | null;
    }
  ) {}
}
