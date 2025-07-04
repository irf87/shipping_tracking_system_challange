import LoginLayout from '@/design-system/templates/LoginLayout';
import FormLogin from '@/domains/auth/presentation/FormLogin';

export default function LoginPage() {
  return (
    <LoginLayout>
      <FormLogin />
    </LoginLayout>
  );
} 