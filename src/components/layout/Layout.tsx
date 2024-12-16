import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-20 max-w-[calc(100%-5rem)] overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}