import Navbar from '@/common/components/NavBar';
import Submenu from '@/common/components/Submenu';
import Footer from '@/common/components/Footer';
import './globals.css';

export const metadata = {
  title: 'Matchmaker',
  description: 'Organiza y participa en jams fácilmente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Submenu />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
