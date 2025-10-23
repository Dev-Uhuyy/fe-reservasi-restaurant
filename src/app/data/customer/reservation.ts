export const ReservationData = {
  rooms: ["Fine Dining Room", "Terrace", "Private Lounge"],
  tables: {
    "Fine Dining Room": ["F.10", "F.11", "F.12", "F.13"],
    "Terrace": ["T.1", "T.2", "T.3"],
    "Private Lounge": ["P.1", "P.2"]
  },
  categories: ["Main Course", "Beverages", "Appetizers", "Desserts"],
  time : ["13.00-15.00", "15.00-17.00", "17.00-19.00", "19.00-21.00", "21.00-23.00"],
  menu: [
    { id: 1, name: "Sate Ayam", price: 99000, category: "Main Course", image_url: "/logo.svg", description:"Sate Ayam Yahud", stock:10 , unit:"portion", status:"available"},
    { id: 2, name: "Sate Sapi", price: 150000, category: "Main Course", image_url: "/logo.svg", description:"Sate Sapi", stock:10 , unit:"portion", status:"available"},
    { id: 3, name: "Gado-Gado", price: 75000, category: "Main Course", image_url: "/logo.svg", description:"Gado-gado", stock:10 , unit:"portion", status:"available"},
    { id: 4, name: "Nasi Goreng", price: 85000, category: "Main Course", image_url: "/logo.svg", description:"Nasi Goreng", stock:10 , unit:"portion", status:"available"},
    { id: 5, name: "Es Teh Manis", price: 25000, category: "Beverages", image_url: "/logo.svg", description:"Es Teh", stock:10 , unit:"portion", status:"available"},
    { id: 6, name: "Jus Alpukat", price: 35000, category: "Beverages", image_url: "/logo.svg", description:"Jus Alpukat", stock:10 , unit:"portion", status:"available"},
    { id: 7, name: "Lumpia Semarang", price: 45000, category: "Appetizers", image_url: "/logo.svg", description:"Lumpia", stock:10 , unit:"portion", status:"available"},
    { id: 8, name: "Puding Coklat", price: 55000, category: "Desserts", image_url: "/logo.svg", description:"Puding", stock:10 , unit:"portion", status:"available"},
    { id: 9, name: "Nasi Goreng Mentai", price: 85000, category: "Main Course", image_url: "/logo.svg", description:"Nasi Goreng", stock:10 , unit:"portion", status:"available"},
  ]
};
