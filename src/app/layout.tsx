import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import Session from "@/providers/Session";
import UseQuery from "@/providers/UseQueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/hooks/use-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🍏 Jobs for Developer | Jobs Dev ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(`antialiased`, inter.className)}>
      <body
        suppressHydrationWarning={true}
        className="min-h-screen antialiased"
      >
        <UseQuery>
          <Session>
            <Nav />
            <div className="container mx-auto h-full max-w-7xl pt-20">
              {children}
            </div>
          </Session>
        </UseQuery>
        <Toast />
      </body>
    </html>
  );
}
