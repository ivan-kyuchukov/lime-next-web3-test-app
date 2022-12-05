import BooksListItem from "./BooksListItem";
import { Book } from "./models/Book";

const BooksList = (props) => {
  return (
    <>
      <p>Available books:</p>
      <ul>
      {
        props.books.length ?
        props.books.map(book => {
          return <BooksListItem book={book} returnBook={props.returnBook} borrowBook={props.borrowBook}></BooksListItem>
        }) :
        <li>Empty list</li>
      }
      </ul>
    </>
  )
}

export default BooksList;