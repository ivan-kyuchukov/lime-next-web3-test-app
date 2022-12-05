import { Borrower } from "./Borrower";

export class Book {
  id: string;
  isbn: string;
  title: string;
  quantity: number;
  borrowers: Borrower[]
};