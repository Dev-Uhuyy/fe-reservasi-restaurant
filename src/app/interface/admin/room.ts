export type RoomStatus = "available" | "reserved" | "occupied"

export interface RoomItem {
  id: string
  name: string
  status: RoomStatus
  imageUrl?: string
}
