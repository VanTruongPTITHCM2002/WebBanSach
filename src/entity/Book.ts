import { Author } from "./Author";
import { Category } from "./Category";
import { Publisher } from "./Publisher";

export interface Book {
    bookid: number;
    title: string;
    price: number;
    stock: number;
    status: boolean;
    image?: string;
    imageBase64:string;
}

export interface BookResponse extends Book{
    authorId: Author,
    publisherId: Publisher,
    category: Category
}