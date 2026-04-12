import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm"
import SignupForm from "@/components/auth/SignupForm";
import RecoverPasswordForm from "@/components/auth/RecoverPasswordForm";

export const Login = () => (
  <AuthLayout 
    title="Bem-vindo" 
    subtitle="Entre na sua conta para explorar as trilhas"
  >
    <LoginForm />
  </AuthLayout>
);

export const Signup = () => (
  <AuthLayout 
    title="Criar Conta" 
    subtitle="Junte-se à maior comunidade de MTB de Poços"
  >
    <SignupForm />
  </AuthLayout>
);

export const RecoverPassword = () => (
  <AuthLayout 
    title="Recuperar Senha" 
    subtitle="Vamos te ajudar a voltar para as trilhas"
  >
    <RecoverPasswordForm />
  </AuthLayout>
);
