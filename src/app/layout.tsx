import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comunicação interna CSEPS",
  description: "Comunicação interna CSEPS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={` h-full antialiased`}
    >

      <body className="min-h-screen flex flex-col bg-zinc-400 text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
