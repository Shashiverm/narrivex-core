export interface AuthRequestUser {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthRequestUser;
    }
  }
}