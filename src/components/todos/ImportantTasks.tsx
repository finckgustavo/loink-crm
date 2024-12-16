import { Link } from 'react-router-dom';
import { Star, Plus, X } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';

export function ImportantTasks() {
  const { todos, updateTodo, deleteTodo } = useTodos();
  const importantTodos = todos.filter(todo => todo.important);

  const toggleCompleted = (id: string, completed: boolean) => {
    updateTodo({
      id,
      updates: { completed },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow mt-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Tarefas Importantes</h2>
          <Link
            to="/todos"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Ver todas as tarefas →
          </Link>
        </div>
      </div>

      <div className="p-6">
        {importantTodos.length === 0 ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Nenhuma tarefa importante no momento</span>
            </div>
            <Link
              to="/todos"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus size={18} />
              Nova Tarefa
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {importantTodos.map((todo) => (
              <div
                key={todo.id}
                className={`
                  flex items-center gap-4 p-4 rounded-lg border border-gray-100
                  ${todo.completed ? 'bg-gray-50' : ''}
                  transition-all hover:shadow-sm
                `}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleCompleted(todo.id, e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`flex-1 text-gray-900 ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <Star
                  size={20}
                  className="text-yellow-500"
                  fill="currentColor"
                />
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}