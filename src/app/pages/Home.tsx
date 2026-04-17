import Link from "next/link";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Gerencie sua equipe com clareza
      </h1>

      <p className="max-w-xl mb-8">
        Organize tarefas, acompanhe progresso e melhore a comunicação interna do seu time com um sistema simples e eficiente.
      </p>

      <div className="flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
          Começar
        </button>

        <button className="border border-zinc-600 px-6 py-3 rounded-lg hover:bg-zinc-800">
          Ver demo
        </button>
      </div>

    </div>
  );
}