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
    imageBase64?:string;
    link?: string;
    authorName?:string;
    publishName?:string;
    categoryName?:string;
}

export interface BookResponse extends Book{
    authorId: Author,
    publisherId: Publisher,
    category: Category
}

export interface BookCreate{
    title: string,
    authorName: string,
    publisherName: string,
    categoryName: string,
    price: number,
    stock: number,
    file?: File,
    link?:string,
}

export interface BookUpdate {
    title?: string,
    authorName?: string,
    publisherName?: string,
    categoryName?: string,
    price?: number,
    stock?: number,
    link?:string;
}