import "./globals.css";
import { Footer } from "./Components/footer/footer";
import { Header } from "./Components/header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>{/* Toda página vai renderizar o footer dps do final dela */}

        </body>
      {/* Esse childrem é a página que tá rodando */}
    </html>
  );
}
