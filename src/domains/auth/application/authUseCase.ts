import { AuthRepository, UserProfile } from '@/domains/auth/domain/auth';

export class AuthUserCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<UserProfile> {
    return await this.authRepository.auth({ email, password });
  }
}