'use client';

import Input from '@/design-system/atoms/inputs/Input';
import Button from '@/design-system/atoms/buttons/Button';
import { useRouter } from 'next/navigation';

import useRegister from './hooks/useRegister';

const FormRegister = () => {
  
  const { errorsForm, handleChange, user, onRegister, isLoading, errorMessage } = useRegister();
  const router = useRouter();

  return (
    <form className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-[var(--foreground)]">Register</h1>
      <Input
        label="Name"
        type="text"
        name="name"
        placeholder="Enter your full name"
        autoComplete="name"
        required
        value={user.name}
        onChange={handleChange}
        helper={errorsForm.name}
        error={!!errorsForm.name}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        autoComplete="email"
        required
        value={user.email}
        onChange={handleChange}
        helper={errorsForm.email}
        error={!!errorsForm.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        autoComplete="new-password"
        required
        value={user.password}
        onChange={handleChange}
        helper={errorsForm.password}
        error={!!errorsForm.password}
      />
      <Button type="button" variant="contained" loading={isLoading} onClick={onRegister}>
        Register
      </Button>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
      )}
      <Button type="button" variant="outlined" onClick={() => router.push('/login')}>
        Cancel
      </Button>
    </form>
  );
};

export default FormRegister;