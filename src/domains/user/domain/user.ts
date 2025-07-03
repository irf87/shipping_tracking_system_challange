export interface User {
  id: string;
  email: string;
}

export interface UserRegister {
  email: string;
  password: string;
  name: string;
}

export interface UserLogin {
  password: string;
}

export interface UserRegisterRepository {
  create(user: UserRegister): Promise<User>;
}