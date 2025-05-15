import NavBar from '@/common/components/Navigation/NavBar/NavBar';
import './globals.css';
import Footer from '@/common/components/Footer/Footer';
import { ConfigProvider } from 'antd';
import themeConfig from '../../themeConfig';

export const metadata = {
  title: 'Matchmaker',
  description: 'Organiza y participa en jams fácilmente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
      <ConfigProvider theme={themeConfig}>
          <NavBar />
            {children}
            <Footer/>
            </ConfigProvider>
      </body>
    </html>
  );
}