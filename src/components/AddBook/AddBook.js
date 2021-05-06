import React from "react";
import Form from "../Form/Form";
import { useHistory } from "react-router";

export default function AddBook(props) {
  const history = useHistory();
  const addBook = async (book) => {
    try {
      await fetch(`http://localhost:3000/books`, {
        method: "POST",
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

  return <Form titleForm="Add new book" typeSubmit={addBook} />;
}
