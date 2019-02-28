import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Books from './Books';
import BookInfo from './BookInfo';

class App extends Component {
	constructor() {
		super();
		this.state = {
			subjects: [],
			books: [],
			selectedSubject: '',
			selectedBook: {},
			booksBySubject: []
		};
	}

	selectSubject(e) {
		let subject = e.target.value;
		this.setState({ selectedSubject: subject });
		this.displayBooks(subject);
	}

	displayBooks(subject) {
		let books = this.state.books.filter(book =>
			book.subjects.includes(subject)
		);

		this.setState({ booksBySubject: books });
	}

	selectedBook = e => {
		let id = parseInt(e.target.value);

		let book = this.state.booksBySubject.filter(book => book.id === id);

		this.setState({ selectedBook: book[0] });
	};

	componentDidMount() {
		//fetch subjects data form books API
		const SUBJECT_URL = 'http://localhost:3010/subjects';
		axios
			.get(SUBJECT_URL)
			.then(response => this.setState({ subjects: response.data }))
			.catch(err => console.log(err));

		//fetch subjects data form books API
		const BOOKS_URL = 'http://localhost:3010/books';
		axios
			.get(BOOKS_URL)
			.then(response => this.setState({ books: response.data }))
			.catch(err => console.log(err));
	}
	render() {
		console.log(this.state);
		console.log('book id:' + this.state.selectedBook.id);
		return (
			<div className="App">
				<div className="books-container">
					<div className="column category">
						<h2>Subjects:</h2>
						<select className="subject-select" multiple size="4">
							{this.state.subjects.map(subject => (
								<option onClick={e => this.selectSubject(e)} value={subject}>
									{subject}
								</option>
								// <p>{subject}</p>
							))}
						</select>
					</div>
					<div className="column books">
						<h2>Books:</h2>
						{this.state.booksBySubject.length === 0 ? (
							''
						) : (
							<Books
								selectedBook={this.selectedBook}
								books={this.state.booksBySubject}
							/>
						)}
					</div>
					<div className="column book-info">
						{this.state.selectedBook.id === undefined ? (
							' '
						) : (
							<BookInfo book={this.state.selectedBook} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
