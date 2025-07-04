import ThemeProvider from '@/lib/ThemeProvider';
import LoginLayout from '@/design-system/templates/LoginLayout';
import FormLogin from '@/domains/auth/presentation/FormLogin';

export default function LoginPage() {
  return (
    <ThemeProvider>
      <LoginLayout>
        <FormLogin />
      </LoginLayout>
    </ThemeProvider>
  );
} 