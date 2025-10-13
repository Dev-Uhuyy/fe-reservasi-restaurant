import { ClipboardList, Utensils } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#FFF6DA] p-6 border-r border-gray-200">
      <h1 className="text-lg font-semibold mb-6">Kasir • Resto</h1>

      <p className="text-sm text-gray-600 mb-3">Manajemen</p>
      <nav className="flex flex-col gap-2">
        <Link
          href="/cashier/orders"
          className="flex items-center gap-2 bg-[#FFD966] p-2 rounded-md font-medium"
        >
          <ClipboardList size={18} />
          Pesanan
        </Link>
        <Link href="/cashier/tables" className="flex items-center gap-2 p-2 rounded-md hover:bg-[#FFF0B3]">
          <Utensils size={18} />
          Meja
        </Link>
      </nav>
    </aside>
  );
}
