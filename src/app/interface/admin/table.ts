export interface TableData {
  id: string | number
  name: string
  room: string
  minCapacity: number
  maxCapacity: number
  status: string
  image?: File | string
}

export interface RoomOption {
  id: string
  name: string
}
