import { useState } from 'react';
import { LayoutDashboard, Database, BarChart, CheckSquare, Calendar, Users, BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    title: 'Dados',
    icon: Database,
    path: '/metrics',
  },
  {
    title: 'Gráficos',
    icon: BarChart,
    path: '/charts',
  },
  {
    title: 'Tarefas',
    icon: CheckSquare,
    path: '/todos',
  },
  {
    title: 'Calendário',
    icon: Calendar,
    path: '/calendar',
  },
];

const adminItems = [
  {
    title: 'Usuários',
    icon: Users,
    path: '/admin',
  },
];

export function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const { user, isAdmin, signOut } = useAuthContext();

  const items = isAdmin ? [...menuItems, ...adminItems] : menuItems;

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-[width] duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <BarChart2 size={20} className="text-white" />
            </div>
            <span className={`text-xl font-bold text-gray-900 whitespace-nowrap transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              Loink
            </span>
          </div>
        </div>
        
        <nav className="flex-1 px-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center h-11 gap-3 px-4 mb-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="w-5 flex items-center justify-center">
                  <Icon size={20} className="flex-shrink-0" />
                </div>
                <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-gray-200">
          <Link
            to="/profile"
            className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium">
                {user?.full_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={`transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{user?.full_name}</p>
              <p className="text-xs text-gray-500 whitespace-nowrap">{user?.email}</p>
            </div>
          </Link>
          {isHovered && (
            <button
              onClick={() => signOut()}
              className="w-full px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </div>
  );
}