import { useState } from 'react';
import { Plus, Star, X } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { AddTodoModal } from './AddTodoModal';
import type { Todo } from '../../types/todo';

export function TodoList() {
  const [showModal, setShowModal] = useState(false);
  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo } = useTodos();

  const toggleImportant = (todo: Todo) => {
    updateTodo({
      id: todo.id,
      updates: { important: !todo.important },
    });
  };

  const toggleCompleted = (todo: Todo) => {
    updateTodo({
      id: todo.id,
      updates: { completed: !todo.completed },
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Erro ao carregar tarefas: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lista de Tarefas</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Tarefa
        </button>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando tarefas...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`
                flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white
                ${todo.completed ? 'bg-gray-50' : ''}
                transition-all hover:shadow-sm
              `}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span
                className={`flex-1 text-gray-900 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => toggleImportant(todo)}
                className={`p-1.5 rounded-md transition-colors ${
                  todo.important
                    ? 'text-yellow-500 hover:bg-yellow-50'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <Star
                  size={20}
                  fill={todo.important ? 'currentColor' : 'none'}
                />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <AddTodoModal
          onSubmit={addTodo}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}