import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useBookLibraryContract from "../hooks/useBookLibraryContract";
import { ethers } from "ethers";

type BookLibrary = {
  contractAddress: string;
};

class Book {
  isbn: string;
  title: string;
  quantity: number;
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
    const booksListSize = (await contract.getSize()).toNumber();
    let newBooks: Book[] = [];
    for (let i: number = 0; i < booksListSize; i++) {
      const [isbn, title, quantity] = await contract.getBook(i);
      const book = new Book();
      book.isbn = isbn;
      book.title = title;
      book.quantity = quantity;
      
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
    await tx.wait().then(() => {
      setLoading(false);
      resetForm();
      getBooks();
    });
  }

  const resetForm = async () => {
    setIsbn('');
    setTitle('');
    setQuantity(0);
  }

  return (
    <div className="results-form">
      <p>Available books:</p>
      <ul>
      {
        books.length ?
        books.map(book => {
          return <li key={book.isbn}>{ book.isbn + ' ' + book.title + ' ' + book.quantity }</li>
        }) :
        <li>Empty list</li>
      }
      </ul>
    <form>
      <label>
        ISBN:
        <input onChange={isbnInput} value={isbn} type="text" name="isbn" />
      </label>
      <label>
        Title:
        <input onChange={titleInput} value={title} type="text" name="title" />
      </label>
      <label>
        Quantity:
        <input onChange={quantityInput} value={quantity} type="number" name="quantity" />
      </label>
      {/* <input type="submit" value="Submit" /> */}
    </form>
    { isLoading ? <p>Transaction waiting to be mined...</p> : null }
    <div className="button-wrapper">
      <button onClick={addUpdateBook}>Add/Update Book</button>
    </div>
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
        }
        
      `}</style>
    </div>
  );
};

export default BookLibrary;
