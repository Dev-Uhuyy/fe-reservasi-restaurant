export const reservationDetails = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      phone: "08123456789",
    },
    room: "Outdoor",
    table: "Table A-3",
    menu: [
      { name: "Seafood Fettuccini", quantity: 2, price: 100000 },
      { name: "Hazelnut Latte", quantity: 2, price: 150000 },
    ],
    total: "", 
    status: "paid",
    date: "2025-10-15",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane@email.com",
      phone: "08123456790",
    },
    room: "Indoor",
    table: "A-12",
    menu: [
      { name: "Fried Rice", quantity: 1, price: 50000 },
      { name: "Ice Tea", quantity: 2, price: 30000 },
    ],
    total: "",
    status: "unpaid",
    date: "2025-10-16",
  },
  {
    id: 3,
    user: {
      name: "Michael Lee",
      email: "michael@lee.com",
      phone: "08123456791",
    },
    room: "Outdoor",
    table: "Table A-5",
    menu: [
      { name: "Spaghetti Carbonara", quantity: 2, price: 100000 },
      { name: "Orange Juice", quantity: 3, price: 150000 },
    ],
    total: "",
    status: "unpaid",
    date: "2025-10-17",
  },
]
