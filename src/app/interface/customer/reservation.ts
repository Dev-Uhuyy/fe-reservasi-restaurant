import { Product } from './menu';
export type RoomStatus = 'active' | 'inactive';
export type TableStatus = 'available'| 'occupied' | 'reserved' | 'maintenance' 


interface Room {
    id: number;
    name: string;
    description?: string;
    image_url?: string;
    status: RoomStatus;
}

interface Tables {
    id: number;
    room_id: number;
    name: string;
    status: TableStatus;
    image_url?: string;
    max_person: number;
    room?: Room;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

type Reservation = {
    id: number;
    user_id: number;
    reservation_date: Date;
    start_time: string;
    end_time: string;
    num_person: number;
    total_price: number;
    status: string;
    user?: User;
    tables?: Tables[];
    products?: ReservationProduct[];
}

type ReservationTable = {
    id: number;
    reservation_id: number;
    table_id: number;
}

type ReservationProduct = {
    id: number;
    reservation_id: number;
    product_id: number;
    qty: number;
    subtotal: number;
    product?: Product;
}

interface IdentityFormData {
  name: string;
  email: string;
  phone: string;
  totalPerson: number;
  date: string;
  time: string;
  room: string;
  table: string;
}

export type { Room, Tables, User, Reservation, ReservationProduct, ReservationTable, IdentityFormData };