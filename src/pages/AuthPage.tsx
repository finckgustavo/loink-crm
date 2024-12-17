import { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';

export function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signIn, signUp, error, isSigningIn, isSigningUp } = useAuthContext();

  return (
    <div className="min-h-screen w-full flex">
      {/* Coluna do formulário */}
      <div className="w-full lg:w-[480px] p-8 flex flex-col justify-center">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <BarChart2 size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Loink</h1>
          </div>

          {/* Cabeçalho */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isSignIn ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isSignIn
                ? 'Entre com suas credenciais para acessar o sistema'
                : 'Preencha os dados abaixo para criar sua conta'}
            </p>
          </div>

          {/* Formulário */}
          {isSignIn ? (
            <SignInForm
              onSubmit={signIn}
              error={error}
              isLoading={isSigningIn}
            />
          ) : (
            <SignUpForm
              onSubmit={signUp}
              error={error}
              isLoading={isSigningUp}
            />
          )}

          {/* Link para alternar formulário */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignIn
                ? 'Não tem uma conta? Cadastre-se'
                : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </div>
      </div>

      {/* Coluna da animação */}
      <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center">
        <dotlottie-player
          src="https://lottie.host/902b8e5d-43b4-4065-903c-b8f801cd05a9/42rgzTCfYz.lottie"
          background="transparent"
          speed="1"
          style={{ width: '500px', height: '500px' }}
          loop
          autoplay
        />
      </div>
    </div>
  );
}