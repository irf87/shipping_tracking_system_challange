import {AxiosInstance} from 'axios';

import { UserRegisterRepository } from "@/domains/user/domain/user";
import { UserRegister, User } from '@/domains/user/domain/user';
import { extractAxiosErrorMessage } from '@/core/utils/readCommonErrors';

export class RegisterUserRepositoryImpl implements UserRegisterRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(user: UserRegister): Promise<User> {
    try {
      const response = await this.api.post('auth/register', user);
      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Unknown error');
      }
      return response.data.data;
    } catch (error: unknown) {
      const axiosMsg = extractAxiosErrorMessage(error);
      if (axiosMsg) {
        throw new Error(axiosMsg);
      }
      throw error;
    }
  }
}