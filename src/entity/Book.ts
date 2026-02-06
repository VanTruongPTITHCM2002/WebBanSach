import { Author } from "./Author";
import { Category } from "./Category";
import { Publisher } from "./Publisher";

export interface Book {
    bookid: number;
    title: string;
    price: number;
    stock: number;
    status: boolean;
    images?: string[];
    thumbnail?:string;
    authorName?:string;
    publisherName?:string;
    categoryName?:string;
}

export interface BookResponse extends Book{
    authorId: string,
    publisherId: string,
    category: string
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
    thumbnail?: string,
    images?: string[],
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