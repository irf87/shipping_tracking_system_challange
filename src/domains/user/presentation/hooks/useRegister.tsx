import { useState, useCallback } from 'react';
import { UserRegister } from '@/domains/user/domain/user';
import { UserEntity } from '@/domains/user/domain/userEntity';
import { RegisterUserRepositoryImpl } from '@/domains/user/infrastructure/registerUserRepositoryImpl';
import { api } from '@/core/utils/api';
import { RegisterUserUseCase } from '@/domains/user/application/registerUserUseCase';
import { useRouter } from 'next/navigation';
import { readCommonErrors } from '@/core/utils/readCommonErrors';

const userEntity = new UserEntity();
const registerUserUseCase = new RegisterUserUseCase(new RegisterUserRepositoryImpl(api));

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserRegister>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: undefined as string | undefined,
    email: undefined as string | undefined,
    password: undefined as string | undefined,
  });

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'email') {
      newValue = value.toLowerCase();
    }
    setUser((prevUser) => ({ ...prevUser, [name]: newValue }));

    let validation: { isValid: boolean; errorMessage?: string };
    if (name === 'name') {
      validation = userEntity.validateName(newValue);
      setErrors((prev) => ({ ...prev, name: validation.errorMessage }));
    } else if (name === 'email') {
      const isValid = userEntity.validateEmail(newValue);
      setErrors((prev) => ({ ...prev, email: isValid ? undefined : 'Invalid email address' }));
    } else if (name === 'password') {
      validation = userEntity.validatePassword(newValue);
      setErrors((prev) => ({ ...prev, password: validation.errorMessage }));
    }
  }, []);

  const onRegister = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      const userCreated = await registerUserUseCase.execute(user);
      if (userCreated && userCreated.id) {
        router.push('/login');
      }
    } catch(error) {
      setErrorMessage(readCommonErrors(error));
    } finally {
      setIsLoading(false);
    }
    
  }, [user, router]);

  return {
    errorsForm: errors,
    handleChange,
    user,
    onRegister,
    isLoading,
    errorMessage,
  };
};

export default useRegister;