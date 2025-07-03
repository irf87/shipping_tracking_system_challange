import ThemeProvider from '@/lib/ThemeProvider';
import LoginLayout from '@/design-system/templates/LoginLayout';
import FormRegister from '@/domains/user/presentation/FormRegister';

export default function RegisterPage() {
  return (
    <ThemeProvider>
      <LoginLayout>
        <FormRegister />
      </LoginLayout>
    </ThemeProvider>
  );
} 