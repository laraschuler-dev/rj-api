// src/core/dtos/LoginResponseDTO.ts
export interface LoginResponseDTO {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string | null;
    };
  }
  