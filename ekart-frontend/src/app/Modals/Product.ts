export interface Product {
    id: number;
    name: string;
    description: string; 
    brand: string;
    gender: string;
    category: string; 
    sizes?: string;
    colors?: string;
    size?: number[];
    color?: string[]; 
    price: number;
    discountPrice?: number; 
    is_in_inventory?: boolean; 
    isInInventory?: boolean;
    items_left?: number;
    itemsLeft?: number;
    imageURL: string;
    slug: string;
    sizeArray?: number[];
    colorArray?: string[];
}