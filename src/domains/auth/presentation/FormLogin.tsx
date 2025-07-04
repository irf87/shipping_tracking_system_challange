'use client';

import Input from '@/design-system/atoms/inputs/Input';
import Button from '@/design-system/atoms/buttons/Button';
import ErrorFormMessage from '@/design-system/atoms/messages/ErrorFormMessage';
import useAuth from './hooks/useAuth';

const FormLogin = () => {
  const { user, errorsForm, handleChange, onLogin, isLoading, errorMessage } = useAuth();

  return (
    <form className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-[var(--foreground)]">Login</h1>
      
      <ErrorFormMessage message={errorMessage} />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your email"
        autoComplete="email"
        required
        helper={errorsForm.email}
        error={!!errorsForm.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        helper={errorsForm.password}
        error={!!errorsForm.password}
      />
      <Button 
        type="button" 
        variant="contained" 
        onClick={onLogin}
        loading={isLoading}
      >
        Login
      </Button>
      <Button type="button" variant="outlined">
        Register
      </Button>
    </form>
  )
}

export default FormLogin;