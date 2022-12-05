const BorrowerListItem = (props) => {
    return (
        <li color='red' key={`${props.book.id} + ${props.borrower.index}`}>{ props.borrower.address }  <span><button onClick={() => props.returnBook(props.book.id, props.borrower.index)} disabled={props.sLoading}>Return Book</button></span></li>
    )
}

export default BorrowerListItem;