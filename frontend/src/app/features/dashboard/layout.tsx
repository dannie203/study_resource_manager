import './globals.css';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
