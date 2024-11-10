

/**
 * Represents a product available in the e-commerce application.
 */
export interface Product {
  id: string;           // Unique identifier for the product
  title: string;        // Name of the product
  price: number;        // Price of the product in the specified currency
  thumbnail: string;    // URL of the product's thumbnail image
  description: string;  // Detailed description of the product
}

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem {
  product: Product;     // The product associated with this cart item
  quantity: number;     // The quantity of the product in the cart
}
