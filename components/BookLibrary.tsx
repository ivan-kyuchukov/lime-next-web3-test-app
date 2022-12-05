import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useBookLibraryContract from "../hooks/useBookLibraryContract";
import BooksList from "./Books/BooksList";
import { Book } from "./Books/models/Book";
import { Borrower } from "./Books/models/Borrower";

type BookLibrary = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookLibrary) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const contract = useBookLibraryContract(contractAddress);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isbn, setIsbn] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');
  const [quantity, setQuantity] = useState<number | undefined>();

  useEffect(() => {
    getBooks();
  },[])

  const getBooks = async () => {
    const booksListSize = (await contract.getBookListSize()).toNumber();
    let newBooks: Book[] = [];
    for (let i: number = 0; i < booksListSize; i++) {
      const [id, isbn, title, quantity] = await contract.getBook(i);
      const book = new Book();
      book.id = id;
      book.isbn = isbn;
      book.title = title;
      book.quantity = quantity;
      book.borrowers = [];
      const borrowersSize = (await contract.getBorrowersListSizePerBook(book.id)).toNumber()
      for (let j: number = 0; j < borrowersSize; j++) {
        const borrower = (await contract.getBorrower(book.id, j)).toString();
        book.borrowers.push(new Borrower(j, borrower));
      }
      
      newBooks.push(book);
    }
    setBooks(newBooks);
  }

  const isbnInput = (input) => {
    setIsbn(input.target.value)
  }

  const titleInput = (input) => {
    setTitle(input.target.value)
  }

  const quantityInput = (input) => {
    setQuantity(input.target.value)
  }

  const addUpdateBook = async () => {
    setLoading(true);
    const tx = await contract.AddUpdateBook(isbn, title, quantity);
    await tx.wait()
      .then(() => {
        setLoading(false);
        resetForm();
        getBooks();
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  const borrowBook = async (bookId: string) => {
    setLoading(true);
    const tx = await contract.BorrowBook(bookId);
    await tx.wait()
      .then(() => {
        setLoading(false);
        resetForm();
        getBooks();
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
      });
  }

  const returnBook = async (bookId: string, bookIndex: number) => {
    setLoading(true);
    const tx = await contract.ReturnBook(bookId, bookIndex);
    await tx.wait()
      .then(() => {
        setLoading(false);
        resetForm();
        getBooks();
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
      });
  }

  const resetForm = async () => {
    setIsbn('');
    setTitle('');
    setQuantity(0);
  }

  return (
    <div className="results-form">
      <BooksList books={books} returnBook={returnBook} borrowBook={borrowBook} isLoading={isLoading}></BooksList>

      { isLoading ? <p>Transaction waiting to be mined...</p> : null }

      <form>
        <label>
          ISBN:
          <input onChange={isbnInput} value={isbn} type="text" name="isbn" disabled={isLoading} />
        </label>
        <label>
          Title:
          <input onChange={titleInput} value={title} type="text" name="title" disabled={isLoading} />
        </label>
        <label>
          Quantity:
          <input onChange={quantityInput} value={quantity} type="number" name="quantity" disabled={isLoading} />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>

      <div className="button-wrapper">
        <button onClick={addUpdateBook} disabled={isLoading}>Add/Update Book</button>
      </div>


      <style jsx>{`
          .results-form {
            display: flex;
            flex-direction: column;
          }

          .button-wrapper {
            margin: 20px;
          }
          `}
      </style>
    </div>
  );
};

export default BookLibrary;
