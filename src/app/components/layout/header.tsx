export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard Kasir</h2>
      <button className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-md">
        Logout
      </button>
    </header>
  );
}
