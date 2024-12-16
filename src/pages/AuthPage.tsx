import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';

export function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signIn, signUp, error, isSigningIn, isSigningUp } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-link text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Loink</h1>
        </div>

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
  );
}