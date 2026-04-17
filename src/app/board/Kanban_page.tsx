export default function BoardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg">To Do</div>
        <div className="bg-zinc-800 p-4 rounded-lg">In Progress</div>
        <div className="bg-zinc-800 p-4 rounded-lg">Done</div>
      </div>
    </div>
  );
}