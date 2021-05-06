import React from "react";
import "./_book.scss";
import { Link } from "react-router-dom";

export default function Book(props) {
  return (
    <>
      <tr id={props.id}>
        <th className="mobile-header">Book title</th>
        <td>{props.title}</td>
        <th className="mobile-header">Author</th>
        <td>{props.author}</td>
        <th className="mobile-header">Category</th>
        <td>{props.category}</td>
        <th className="mobile-header">ISBN</th>
        <td>{props.isbn}</td>
        <th className="mobile-header">Actions</th>
        <td className="table__actions">
          <Link to={`/edit-book/${props.id}`}>
            <button className="button-edit">Edit</button>
          </Link>
          <button
            className="button-warning"
            onClick={() => props.callModalDeleteBook(props.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
