import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoList } from '../components/todos/TodoList';
import { PageLoader } from '../components/shared/PageLoader';

export function TodoListPage() {
  const { todos, isLoading, isFetching } = useTodos();

  if (isLoading || isFetching) {
    return <PageLoader message="Carregando tarefas..." />;
  }

  return <TodoList />;
}