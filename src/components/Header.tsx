import React, { useState } from 'react';
import {
  CameraIcon,
  DashboardIcon,
  IncidentsIcon,
  ScenesIcon,
  UsersIcon,
} from './icons';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({
  icon,
  label,
  active,
}) => (
  <a
    href="#"
    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm ${
      active
        ? 'bg-blue-600/20 text-blue-300'
        : 'text-gray-400 hover:bg-slate-700/50 hover:text-gray-200'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </a>
);

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#141C31]/50 border-b border-slate-700/50 px-4 py-3 h-16 flex items-center justify-between flex-wrap">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-500"
        >
          <path
            d="M4 18L12 6L20 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 18L12 11L16 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xl font-bold text-gray-100">MANDLACX</span>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="sm:hidden text-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Nav Menu */}
      <nav
        className={`w-full sm:w-auto sm:flex items-center gap-4 mt-3 sm:mt-0 ${
          menuOpen ? 'flex flex-col sm:flex-row' : 'hidden sm:flex'
        }`}
      >
        <NavItem icon={<DashboardIcon className="w-4 h-4" />} label="Dashboard" active />
        <NavItem icon={<CameraIcon className="w-4 h-4" />} label="Cameras" />
        <NavItem icon={<ScenesIcon className="w-4 h-4" />} label="Scenes" />
        <NavItem icon={<IncidentsIcon className="w-4 h-4" />} label="Incidents" />
        <NavItem icon={<UsersIcon className="w-4 h-4" />} label="Users" />
      </nav>

      {/* User Info */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://picsum.photos/seed/user/40/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-slate-600"
          />
          <div className="hidden md:block">
            <p className="font-semibold text-gray-200">Mohammed Ajhas</p>
            <p className="text-xs text-gray-400">ajhas@mandlac.com</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 cursor-pointer"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </header>
  );
};

export default Header;
