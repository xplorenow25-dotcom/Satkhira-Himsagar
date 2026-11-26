export type ProductCategory = 'mangoes' | 'honey';

export type ProductAvailability = 'In Stock' | 'Limited Harvest' | 'Out of Stock';

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  /** Optional regular price shown crossed out beside the current price */
  compareAtPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  bestseller?: boolean;
  shortDescription: string;
  description: string;
  harvestSeason: string;
  origin: string;
  packaging: string;
  deliveryNote: string;
  availability: ProductAvailability;
  image: string;
  imageAlt: string;
  /** Minimum order quantity (e.g., 10 KG for mangoes, 1 jar for honey) enforced in Cart & Checkout */
  minOrderQuantity?: number;
  /** Step increment in Cart & Checkout (e.g., 10 KG for mangoes -> 10, 20, 30, 40) */
  quantityStep?: number;
  /** Unit suffix shown in cart & pricing (e.g., 'KG') */
  unitLabel?: string;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export type PaymentMethod = 'Cash on Delivery' | 'Manual bKash';

export interface CheckoutFormData {
  fullName: string;
  mobileNumber: string;
  district: string;
  upazila: string;
  fullAddress: string;
  instructions: string;
  paymentMethod: PaymentMethod;
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'mangoes'
  | 'honey'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'about'
  | 'contact'
  | 'faq'
  | 'delivery'
  | 'refund-policy';
