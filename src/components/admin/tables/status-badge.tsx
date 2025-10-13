import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: string }) {
  const style = cn(
    "px-3 py-1 rounded-full text-xs font-medium",
    status === "available" && "bg-black text-white",
    status === "occupied" && "bg-gray-200 text-gray-700",
    status === "reserved" && "bg-gray-100 text-gray-700"
  )

  return <span className={style}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
}
