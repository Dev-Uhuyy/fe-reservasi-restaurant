interface ProductCategory {
    id: number;
    name: string;
}

interface Product {
    id: number;
    category_id: number;
    name: string;
    description?: string;
    image_url?: string;
    price: number;
    stock: number;
    unit: string;
    status: string;
    category?: ProductCategory;
}

export type { Product, ProductCategory}