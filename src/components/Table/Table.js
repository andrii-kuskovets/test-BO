import React, { useState } from "react";
import "./_table.scss";
import Book from "../Book/Book";
import Modal from "../Modal/Modal";

export default function Table(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const deleteBook = async (id) => {
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      }).then(() => {
        setShowModal(false);
        props.fetchData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const callModalDeleteBook = (id) => {
    setShowModal(true);
    setSelectedBook(props.books.find((book) => book.id === id));
  };

  return (
    <>
      <table className="table">
        <thead className="table__head">
          <tr>
            <th>Book title</th>
            <th>Author name</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.books.map((item) => (
            <Book
              key={item.id}
              {...item}
              callModalDeleteBook={callModalDeleteBook}
            />
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          deleteBook={deleteBook}
          {...selectedBook}
          handleNo={() => setShowModal(false)}
        />
      )}
    </>
  );
}
