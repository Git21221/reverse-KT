import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "job Board",
  description: "A job board for developers",
};

import Provider from "@/features/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
          <Provider>
            <Navbar />
            {children}
          </Provider>
      </body>
    </html>
  );
}
