import BorrowerListItem from "./BorrowerListItem";

const BooksListItem = (props) => {
    return (<>
      <li key={props.book.id}>{ `ISBN: ${props.book.isbn} - Title: ${props.book.title} - Quantity: ${props.book.quantity}` }   <span><button onClick={() => props.borrowBook(props.book.id)} disabled={props.isLoading}>Borrow Book</button></span></li>
      <ul>
      <br></br>
      {
        props.book.borrowers.length ?
        props.book.borrowers.map(borrower => {
          return <BorrowerListItem borrower={borrower} book={props.book} isLoading={props.isLoading} returnBook={props.returnBook}></BorrowerListItem>
        }) :
        ''
      }
      </ul>
      <br></br>
      <br></br>
    </>
  )
}

export default BooksListItem;