'use client';

import LoginButton from "../../LoginButton/Delivery";
import { Image, Layout, Menu } from 'antd';
import Link from 'next/link';
import { FC } from "react";

const { Header } = Layout;

const navItems = [
  { key: 'jams', label: 'Jams', href: '/jams' },
  { key: 'crear', label: 'Crear Jam', href: '/crear' },
  { key: 'mis', label: 'Mis Jams', href: '/mis-jams' },
  { key: 'historial', label: 'Historial', href: '/historial' },
];

// Generar los ítems para el menú (con JSX en label)
const menuItems = navItems.map(item => ({
  key: item.key,
  label: <Link href={item.href}>{item.label}</Link>,
}));

const NavBar: FC = () => {
  return (
<Header className="bg-primary-dark px-10 shadow-sm h-16 flex items-center relative z-50">

<div className="flex items-center">
  <Link href="/" className="my-2 mx-2 text-lg font-bold text-gray-800 hover:text-black flex items-center">
    <Image
      src="mmkr_logov2.png"
      alt="Logo de Matchmaker"
      height={55}
      width={55}
      preview={false}
      className="inline-block align-middle"
    />
  </Link>

  <Link href="/" className="ml-3 text-lg font-bold text-gray-800 hover:text-black">
    MatchMaKeR
  </Link>
</div>

      {/* Hasta esta parte*/}

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Menu
          mode="horizontal"
          selectable={false}
          className="border-none font-medium text-base bg-transparent"
          items={menuItems}
        />
      </div>

      {/* Botón a la derecha */}
      <div className="ml-auto">
        <LoginButton />
      </div>
    </Header>
  );
};

export default NavBar;


/*
export default function Navbar() {

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">LOGO</span>

          <div className="flex items-center gap-4">
          <LoginButton/>
          </div>
      
      </div>
    </nav>
  );
}

*/