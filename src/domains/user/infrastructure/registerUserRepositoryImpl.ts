import {AxiosInstance} from 'axios';

import { UserRegisterRepository } from "@/domains/user/domain/user";
import { UserRegister, User } from '@/domains/user/domain/user';
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
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: unknown }).response === 'object' &&
        (error as { response?: { data?: { error?: { message?: string } } } }).response?.data?.error
      ) {
        throw new Error((error as { response: { data: { error: { message: string } } } }).response.data.error.message);
      }
      throw error;
    }
  }
}