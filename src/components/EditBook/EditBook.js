import React from "react";
import Form from "../Form/Form";
import { useHistory, useParams } from "react-router";
import { MyContext } from "../Main/Main";

export default function EditBook(props) {
  const history = useHistory();
  let { id } = useParams();

  const editBook = async (book) => {
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }).then(() => {
        props.fetchData();
        history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Consumer>
      {({ books }, fetchData) => (
        <Form
          titleForm="Edit book"
          books={books}
          selectedBook={books.find((item) => item.id.toString() === id)}
          typeSubmit={editBook}
        />
      )}
    </MyContext.Consumer>
  );
}
