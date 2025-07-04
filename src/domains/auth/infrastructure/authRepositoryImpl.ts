import { AxiosInstance } from 'axios';
import { AuthRepository, UserLogin, UserProfile } from '@/domains/auth/domain/auth';
import { extractAxiosErrorMessage } from '@/core/utils/readCommonErrors';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly api: AxiosInstance) {}

  async auth(userLogin: UserLogin): Promise<UserProfile> {
    try{
      const response = await this.api.post('auth/login', userLogin);
      return response.data.data;
    } catch(error: unknown) {
      const axiosMsg = extractAxiosErrorMessage(error);
      if (axiosMsg) {
        throw new Error(axiosMsg);
      }
      throw error;
    }
  }
}