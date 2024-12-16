import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthContext } from '../contexts/AuthContext';
import { useUpdateProfile } from '../hooks/useProfile';

// Schemas separados para cada formulário
const nameSchema = z.object({
  full_name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
});

const emailSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha necessária para confirmar alteração'),
});

const passwordSchema = z.object({
  current_password: z.string().min(6, 'Senha atual deve ter no mínimo 6 caracteres'),
  new_password: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
});

type NameFormData = z.infer<typeof nameSchema>;
type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export function ProfilePage() {
  const { user } = useAuthContext();
  const { updateProfile, isUpdating } = useUpdateProfile();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Formulário para nome
  const nameForm = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      full_name: user?.full_name || '',
    },
  });

  // Formulário para email
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  // Formulário para senha
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setError(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateName = async (data: NameFormData) => {
    try {
      await updateProfile({ type: 'name', ...data });
      showSuccess('Nome atualizado com sucesso!');
      nameForm.reset({ full_name: data.full_name });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar nome');
    }
  };

  const handleUpdateEmail = async (data: EmailFormData) => {
    try {
      await updateProfile({ type: 'email', ...data });
      showSuccess('E-mail atualizado com sucesso!');
      emailForm.reset({ email: data.email });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar e-mail');
    }
  };

  const handleUpdatePassword = async (data: PasswordFormData) => {
    try {
      await updateProfile({ type: 'password', ...data });
      showSuccess('Senha atualizada com sucesso!');
      passwordForm.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar senha');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Meu Perfil</h1>

        <div className="space-y-6">
          {/* Formulário de Nome */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Nome</h2>
            <form onSubmit={nameForm.handleSubmit(handleUpdateName)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  {...nameForm.register('full_name')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {nameForm.formState.errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {nameForm.formState.errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isUpdating ? 'Salvando...' : 'Atualizar Nome'}
                </button>
              </div>
            </form>
          </div>

          {/* Formulário de E-mail */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">E-mail</h2>
            <form onSubmit={emailForm.handleSubmit(handleUpdateEmail)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  {...emailForm.register('email')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {emailForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  {...emailForm.register('password')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {emailForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {emailForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isUpdating ? 'Salvando...' : 'Atualizar E-mail'}
                </button>
              </div>
            </form>
          </div>

          {/* Formulário de Senha */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h2>
            <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha Atual
                </label>
                <input
                  type="password"
                  {...passwordForm.register('current_password')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {passwordForm.formState.errors.current_password && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordForm.formState.errors.current_password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  {...passwordForm.register('new_password')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {passwordForm.formState.errors.new_password && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordForm.formState.errors.new_password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  {...passwordForm.register('confirm_password')}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {passwordForm.formState.errors.confirm_password && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordForm.formState.errors.confirm_password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isUpdating ? 'Salvando...' : 'Atualizar Senha'}
                </button>
              </div>
            </form>
          </div>

          {/* Mensagens de Feedback */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}