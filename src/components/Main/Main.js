import React, { createContext } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Library from "../Library/Library";
import AddBook from "../AddBook/AddBook";
import EditBook from "../EditBook/EditBook";
import useFetch from "../useFetch";

export const MyContext = createContext("defaultValue");

export default function Main() {
  const [data, loading, error, fetchData] = useFetch(
    "http://localhost:3000/books/"
  );

  if (error) return <div>{error}</div>;
  return (
    <MyContext.Provider value={{ books: data, loading, fetchData }}>
      <BrowserRouter>
        <Link to="/">
          <h1 className="main-title">My Library</h1>
        </Link>
        <Switch>
          <Route exact path="/" render={() => <Library loading={loading} />} />
          <Route
            exact
            path="/add-book"
            render={() => <AddBook fetchData={fetchData} />}
          />
          <Route
            exact
            path="/edit-book/:id"
            render={() => <EditBook fetchData={fetchData} />}
          />
        </Switch>
      </BrowserRouter>
    </MyContext.Provider>
  );
}
