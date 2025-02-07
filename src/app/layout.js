import "./globals.css";
import AuthProvider from "@/components/SessionProvider";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Project Hub - A hub where every one can share projects",
  description: "A project sharing platform where anyone can showcase there projects to anyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased font-poppins`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
