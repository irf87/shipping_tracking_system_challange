import LoginLayout from '@/design-system/templates/LoginLayout';
import FormRegister from '@/domains/user/presentation/FormRegister';

export default function RegisterPage() {
  return (
    <LoginLayout>
      <FormRegister />
    </LoginLayout>
  );
} 