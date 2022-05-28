interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface CartProductType extends ProductType {
    quantity: number;
    unitPrice: number;
    isQuantityError: boolean;
}

export type { ProductType, CartProductType };