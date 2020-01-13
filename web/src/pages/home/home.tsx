import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getBooks } from './action/getBook';

import './home.scss';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(data => {
      setBooks(data as []);
    });
  }, []);

  const renderBookList = books.map((book, index) => (
    <Link to="/detail" key={index}>
      <div className="book-container">
        <div className="img-container">
          <img src={book.cover} />
        </div>
        <div className="info-container">
          <div>
            <h2>{book.title}</h2>
          </div>
          <div>{book.author}</div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="home">
      <div className="title">
        <h1>CV Library</h1>
      </div>
      <div className="content-container">{renderBookList}</div>
    </div>
  );
}

export default Home;
