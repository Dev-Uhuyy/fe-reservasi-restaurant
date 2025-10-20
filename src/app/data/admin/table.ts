import { TableData } from "@/app/interface/admin/table"

// Mock data ruangan
export const mockRooms = [
  { id: "room1", name: "Outdoor" },
  { id: "room2", name: "Indoor" },
]

// Mock data meja
export const mockTables: TableData[] = [
  {
    id: 1,
    name: "Table A1",
    room: "Indoor",
    minCapacity: 2,
    maxCapacity: 4,
    status: "available",
    image: "/images/table1.jpeg",
  },
  {
    id: 2,
    name: "Table A2",
    room: "Outdoor",
    minCapacity: 4,
    maxCapacity: 6,
    status: "reserved",
    image: "/images/table2.jpeg",
  },
    {
    id: 3,
    name: "Table A3",
    room: "Outdoor",
    minCapacity: 4,
    maxCapacity: 6,
    status: "occupied",
    image: "/images/table3.jpeg",
  },
]
