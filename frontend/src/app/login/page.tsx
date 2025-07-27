import LoginForm from "@/components/layout/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[url('/images/mar-background.png')] bg-cover bg-no-repeat bg-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
