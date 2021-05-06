import React, { useState, useEffect } from "react";
import "./_form.scss";
import { useHistory } from "react-router";

function validateIsbn(value) {
  let onlyNumbers = /^[0-9]*$/;
  return !onlyNumbers.test(value);
}

export default function Form(props) {
  const [value, setValue] = useState({
    title: "",
    author: "",
    category: "fiction",
    isbn: "",
  });
  const [typeError, setTypeError] = useState({});
  const history = useHistory();
  const typeSubmit = props.typeSubmit;
  const handleChange = (event) => {
    event.persist();
    setValue((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const validateForm = () => {
    let isCheckedValidate = true;
    for (let key in value) {
      if (!value[key]) {
        setTypeError((error) => ({ ...error, [key]: "Required" }));
        isCheckedValidate = false;
      }
    }

    if (value.isbn && validateIsbn(value.isbn)) {
      setTypeError((inputs) => ({ ...inputs, isbn: "Only numbers allowed" }));
      isCheckedValidate = false;
    }

    return isCheckedValidate;
  };

  const handleFocus = (event) => {
    let targetElement = event.target.name;
    if (typeError[targetElement] !== "") {
      event.persist();
      setTypeError((inputs) => ({ ...inputs, [targetElement]: "" }));
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) typeSubmit(value, props.id);
  };

  useEffect(() => {
    if (props.selectedBook) {
      setValue({ ...props.selectedBook });
    }
  }, [props.selectedBook]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form__title">{props.titleForm}</h1>
      <div className="form__group">
        <label className="form__label" htmlFor="title">
          Book title
        </label>
        <input
          onFocus={handleFocus}
          className={
            typeError.title ? "form__input form__input_error" : "form__input"
          }
          name="title"
          id="title"
          type="text"
          value={value.title || ""}
          onChange={handleChange}
        />
        <span className="form__message-error">{typeError.title}</span>
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="author">
          Author name
        </label>
        <input
          onFocus={handleFocus}
          className={
            typeError.author ? "form__input form__input_error" : "form__input"
          }
          name="author"
          id="author"
          type="text"
          value={value.author || ""}
          onChange={handleChange}
        />
        <span className="form__message-error">{typeError.author}</span>
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="category">
          Select a Category
        </label>
        <select
          value={value.category || "fiction"}
          onFocus={handleFocus}
          className={
            typeError.category ? "form__input form__input_error" : "form__input"
          }
          name="category"
          id="category"
          onChange={handleChange}
        >
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
          <option value="novel">Novel</option>
          <option value="drama">Drama</option>
        </select>
        <span className="form__message-error">{typeError.category}</span>
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="isbn">
          ISBN
        </label>
        <input
          onFocus={handleFocus}
          className={
            typeError.isbn ? "form__input form__input_error" : "form__input"
          }
          name="isbn"
          id="isbn"
          type="text"
          value={value.isbn || ""}
          onChange={handleChange}
        />
        <span className="form__message-error">{typeError.isbn}</span>
      </div>
      <button type="submit" className="button-success form__btn">
        <span>Okay</span>
      </button>
      <button
        title="Return to the library"
        className="form__close"
        onClick={handleClose}
      />
    </form>
  );
}
