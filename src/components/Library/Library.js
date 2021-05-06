import React from "react";
import "./_library.scss";
import Table from "../Table/Table";
import { useHistory } from "react-router";
import { MyContext } from "../Main/Main";

export default function Library(props) {
  const history = useHistory();

  if (props.loading) return <h2 className="loading">LOADING...</h2>;
  return (
    <MyContext.Consumer>
      {({ books, fetchData }) => (
        <div className="dashboard">
          <button
            className="button-success dashboard__btn"
            onClick={() => history.push("/add-Book")}
          >
            Add new book
          </button>
          {books.length === 0 ? (
            <div className="dashboard__empty-list">
              Oops! The list of books is empty.
            </div>
          ) : (
            <Table books={books} fetchData={fetchData} />
          )}
        </div>
      )}
    </MyContext.Consumer>
  );
}
