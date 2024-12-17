import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { TodoList as TodoListComponent } from '../components/todos/TodoList';
import { PageLoader } from '../components/shared/PageLoader';
import { RefreshButton } from '../components/shared/RefreshButton';
import { useQueryClient } from '@tanstack/react-query';
import { AddTodoModal } from '../components/todos/AddTodoModal';

export function TodoListPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { todos, isLoading, isFetching, addTodo } = useTodos();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ 
        queryKey: ['todos', sessionStorage.getItem('userId')] 
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading || isFetching) {
    return <PageLoader message="Carregando tarefas..." />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Tarefas</h1>
        <div className="flex items-center gap-2">
          <RefreshButton 
            onClick={handleRefresh}
            isLoading={isRefreshing}
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Adicionar Tarefa
          </button>
        </div>
      </div>

      <TodoListComponent />

      {showModal && (
        <AddTodoModal
          onSubmit={(title) => {
            addTodo(title);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}