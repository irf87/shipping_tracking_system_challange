import { UserProfile as ImportedUserProfile } from '@/domains/user/domain/user';

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfile {
  token: string;
  user: ImportedUserProfile;
}

export interface AuthRepository {
  auth(userLogin: UserLogin): Promise<UserProfile>;
}