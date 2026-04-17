export function Header() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 border-b border-zinc-800">
      <h1 className="font-bold text-lg">CSEPS</h1>

      <nav className="flex gap-6 text-sm">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">Boards</a>
        <a href="#" className="hover:text-blue-500">Equipe</a>
        <a href="#" className="hover:text-blue-500">About Us</a>
      </nav>
    </header>
  );
}