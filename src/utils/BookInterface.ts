export interface BookInterface {
    title: string;
    author: string;
    isbn: number;
    genres?: string[];
    rating: number;
    cover?: string;
}