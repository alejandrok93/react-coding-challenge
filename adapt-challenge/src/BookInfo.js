import React from 'react';

class BookInfo extends React.Component {
	constructor() {
		super();
		this.state = { book: {} };
	}

	componentDidMount() {
		this.setState({ book: this.props.book });
	}

	componentDidUpdate() {
		if (this.state.book.id !== this.props.book.id) {
			this.setState({ book: this.props.book });
		}
	}

	render() {
		console.log(this.props.book.title);
		return (
			<div className="book-details">
				Selected book:
				<h4>{this.state.book.title}</h4>
				<label>Title: </label>
				<input value={this.state.book.title} type="text" />
			</div>
		);
	}
}

export default BookInfo;
