
import './globals.css';

export const metadata = {
  title: 'StudyShare',
  description: 'Share learning resources',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
