import { Logo } from './_components/logo';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-6">
      <Logo />
      {children}
    </div>
  );
}

export default AuthLayout;
