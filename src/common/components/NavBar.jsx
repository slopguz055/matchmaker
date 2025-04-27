import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="relative bg-gray-800 text-white p-4 flex justify-end items-center">
      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">LOGO</span>
        </Link>
      </div>

      {/* Botones a la derecha */}
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">Login</button>
        <button className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded">Registrarse</button>
      </div>
    </nav>
  );
};

export default Navbar;
