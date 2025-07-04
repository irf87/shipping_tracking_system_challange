import { useState, useCallback } from 'react';
import { UserLogin } from '@/domains/auth/domain/auth';
import { UserEntity } from '@/domains/user/domain/userEntity';
import { AuthRepositoryImpl } from '@/domains/auth/infrastructure/authRepositoryImpl';
import { api } from '@/core/utils/api';
import { AuthUserCase } from '@/domains/auth/application/authUseCase';
import { useRouter } from 'next/navigation';
import { readCommonErrors } from '@/core/utils/readCommonErrors';
import { Validation } from '@/core/types/validations';

const authUseCase = new AuthUserCase(new AuthRepositoryImpl(api));
const userEntity = new UserEntity();

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
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
    setErrors((prev) => ({ ...prev, [name]: undefined }));

    let validation: Validation;
    if (name === 'email') {
      validation = userEntity.validateEmail(newValue);
      setErrors((prev) => ({ ...prev, email: validation.errorMessage }));
    } else if (name === 'password' && newValue && newValue.length < 6) {
      validation = userEntity.validatePassword(newValue);
      setErrors((prev) => ({ ...prev, password: validation.errorMessage }));
    }
  }, []);

  const onLogin = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(undefined);
    
    try {
      await authUseCase.execute(user.email, user.password);
      
      router.push('/');
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
    onLogin,
    isLoading,
    errorMessage,
  };
};

export default useAuth;