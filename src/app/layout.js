import { Inter } from "next/font/google";
import ThemeProvider from '../components/ThemeProvider.js';
import '../themes/globals.css';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
