'use client'; // Necesario porque usamos hooks en un componente de cliente

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Submenu = () => {
  const pathname = usePathname();

  const links = [
    { href: '/jams', label: 'Jams' },
    { href: '/crear-jam', label: 'Crear Jam' },
    { href: '/mis-jams', label: 'Mis jams' },
    { href: '/historial', label: 'Historial' },
  ];

  return (
    <div className="bg-gray-700 text-white flex justify-center space-x-6 p-2">
      {links.map(link => (
        <Link key={link.href} href={link.href}>
          <span
            className={`cursor-pointer ${
              pathname === link.href
                ? 'text-yellow-400 font-bold'
                : 'hover:text-yellow-200'
            }`}
          >
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Submenu;
