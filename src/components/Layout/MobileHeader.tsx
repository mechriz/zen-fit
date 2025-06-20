import React from 'react';
import { Bell, Search } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showSearch = false,
  showNotifications = true,
}) => {
  return (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center space-x-3">
        {showSearch && (
          <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
            <Search size={20} />
          </button>
        )}
        {showNotifications && (
          <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors relative">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-500 rounded-full"></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;