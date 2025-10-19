// core/dtos/HomePostDTO.ts
export interface HomeEventDTO {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  content: string;
}

export interface HomeServiceDTO {
  id: number;
  title: string;
  image: string;
  content: string;
  description: string;
}