
import { Product } from '../types/types';

/**
 * Fetches products from the external API.
 * 
 * @returns A promise that resolves to an object containing an array of products.
 * @throws An error if the network response is not ok.
 */
export const fetchProducts = async (): Promise<{ products: Product[] }> => {
  // Make a fetch request to the API endpoint
  const response = await fetch('https://dummyjson.com/products');

  // Check if the response is OK (status code in the range 200-299)
  if (!response.ok) {
    throw new Error('Network response was not ok'); // Throw an error if the response is not successful
  }

  // Parse and return the JSON data from the response
  return response.json();
};
