export interface ILoginUserResponseDTO {
  id: string;
  name: string;
  level: string;
  email: string;
  status: number;
  statement: string;
  location: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
