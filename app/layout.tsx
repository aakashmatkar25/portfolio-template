import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <nav className="container mx-auto p-6">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold">Portfolio</a>
            <div className="space-x-6">
              <a href="/projects" className="hover:text-blue-400 transition">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-gray-700 mt-12 py-6 text-center">
          <p>© 2024 Your Name. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}