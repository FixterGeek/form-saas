export type Project = {
  id: number;
  name: string | null;
  userId: number;
};

export type Suscriber = {
  name: string | null;
  email: string;
  id: number;
};

export type User = {
  name: string | null;
  email: string;
  id: number;
  access_token: string | null;
  picture: string | null;
  provider: string | null;
  refresh_token: string | null;
};

export type Database = {
  Project: Project;
  Suscriber: Suscriber;
  User: User;
};
