export interface IProduct {
  category: Category;
  creationAt: Date;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: Date;
}

export interface Category {
  creationAt: Date;
  id: number;
  image: string;
  name: string;
  updatedAt: Date;
}