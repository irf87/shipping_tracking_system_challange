import { UserRegister, UserRegisterRepository, User } from "@/domains/user/domain/user";

export class RegisterUserUseCase {
  constructor(private readonly userRegisterRepository: UserRegisterRepository) {}

  async execute(user: UserRegister): Promise<User> {
    return await this.userRegisterRepository.create(user);
  }
}