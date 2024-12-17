import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { SignUpData } from '../../types/auth';

const schema = z.object({
  full_name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

interface Props {
  onSubmit: (data: SignUpData) => void;
  error: Error | null;
  isLoading: boolean;
}

export function SignUpForm({ onSubmit, error, isLoading }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome completo</label>
        <input
          type="text"
          placeholder="Seu nome completo"
          {...register('full_name')}
          className="mt-1 block w-full rounded-lg bg-gray-50 px-4 py-2.5 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          placeholder="exemplo@email.com"
          {...register('email')}
          className="mt-1 block w-full rounded-lg bg-gray-50 px-4 py-2.5 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Senha</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            className="mt-1 block w-full rounded-lg bg-gray-50 px-4 py-2.5 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}