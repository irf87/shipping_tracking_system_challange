import { Validation } from "@/core/types/validations";

export class UserEntity {
  validateEmail(email: string) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return {
      isValid,
      errorMessage: isValid ? undefined : 'Invalid email address',
    };
  }

  validatePassword(password: string): Validation {
    const isValid = password.length >= 8;
    return {
      isValid,
      errorMessage: isValid ? undefined : 'Password must be at least 8 characters long',
    };
  }

  validateName(name: string): Validation {
    const isValid = name.length >= 3;
    return {
      isValid,
      errorMessage: isValid ? undefined : 'Name must be at least 3 characters long',
    };
  }

  validatePhone(phone: string) {
    return phone.length >= 10;
  }
}
