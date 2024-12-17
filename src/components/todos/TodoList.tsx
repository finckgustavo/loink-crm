import { Star, X } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import type { Todo } from '../../types/todo';

export function TodoList() {
  const { todos, updateTodo, deleteTodo } = useTodos();

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

  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
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
  );
}