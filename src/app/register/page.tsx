import ThemeProvider from '@/lib/ThemeProvider';
import LoginLayout from '@/design-system/templates/LoginLayout';
import Input from '@/design-system/atoms/inputs/Input';
import Button from '@/design-system/atoms/buttons/Button';

export default function RegisterPage() {
  return (
    <ThemeProvider>
      <LoginLayout>
        <form className="space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[var(--foreground)]">Register</h1>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            required
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
          <Button type="button" variant="outlined">
            Cancel
          </Button>
        </form>
      </LoginLayout>
    </ThemeProvider>
  );
} 