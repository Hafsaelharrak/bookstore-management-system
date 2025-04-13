export interface Book {
  id?: number;        // girl this is optional because it’s not needed when creating a book
  title: string;
  author: string;
  price: number;
  description?: string; // girl this is an optional description
}