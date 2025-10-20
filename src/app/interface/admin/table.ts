export interface TableData {
  id?: string | number
  name: string
  room: string
  minCapacity: number
  maxCapacity: number
  status: string
  image?: string | File
}

export interface RoomOption {
  id: string
  name: string
}
