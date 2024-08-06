import React, { useEffect, useState } from "react";
import "./Form.css";
function App() {
  const [inputsValue, setInputsValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [inputsError, setInputsError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsValue({ ...inputsValue, [name]: value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const errors = validate(inputsValue);
    setInputsError(errors);
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    // Regex for validating email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!values.username) {
      errors.username = "*Username is required!";
    }
    if (!values.email) {
      errors.email = "*Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "*Please enter a valid email";
    }
    if (!values.password) {
      errors.password = "*Password is required!";
    } else if (values.password.length < 6) {
      errors.password = "*Enter minimum 6 charactors!";
    }
    return errors;
  };
  useEffect(() => {
    if (Object.keys(inputsError).length === 0 && isSubmit) {
      console.log(inputsValue);
    }
  }, [inputsError, inputsValue, isSubmit]);
  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <h3>Login Form</h3>
        <div className="login_feild">
          <div className="feild">
            <label>Username: </label>
            <input
              name="username"
              type="text"
              placeholder="Enter user name"
              value={inputsValue.username}
              onChange={inputHandle}
            />
          </div>
          <div>
            <span>{inputsError.username}</span>
          </div>
          <div className="feild">
            <label>Email: </label>
            <input
              name="email"
              type="text"
              placeholder="Enter user Email"
              value={inputsValue.email}
              onChange={inputHandle}
            />
          </div>
          <div>
            <span>{inputsError.email}</span>
          </div>
          <div className="feild">
            <label>Password: </label>
            <input
              name="password"
              type="password"
              placeholder="Enter user Password"
              value={inputsValue.password}
              onChange={inputHandle}
            />
          </div>
          <div>
            <span>{inputsError.password}</span>
          </div>
          <div className="button">
            <button type="submit">SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default App;
