import React from 'react';

const Books = props => {
	console.log(props);
	return (
		// <div>
		// 	<h4>{props.books.map(book => book.title)}</h4>
		// </div>

		<select multiple size="5">
			{props.books.map(book => {
				{
					return (
						<option onClick={e => props.selectedBook(e)} value={book.id}>
							{book.title.slice(0, 45)}
						</option>
					);
				}
			})}
		</select>
	);
};

export default Books;
