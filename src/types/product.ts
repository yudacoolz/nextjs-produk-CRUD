// types/product.ts

export interface Image {
  base64: string;
  type: string;
}

interface Author {
  name: string;
}

export interface Product {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  published: boolean;
  author: Author;
  ImageUrl: string[];
}
