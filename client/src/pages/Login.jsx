import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../utils/api";
import axios from "axios";

export default function Login() {
  const navigator = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const submintHandler = async (event) => {
    event.preventDefault();
    if (form.name === "" || form.password === "") {
      alert("please enter username and password");
    }
    const response = await axios.post(loginApi, form);
    alert(response.data.msg);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
    console.log(form);
  };

  return (
    <div className="registerWrapper">
      <form onSubmit={submintHandler} className="regForm">
        <h2>Login</h2>
        <input placeholder="name" name="name" onChange={changeHandler}></input>
        <input
          placeholder="password"
          name="password"
          onChange={changeHandler}
        ></input>
        <button type="submit">Login</button>
        <span className="registerSpan">
          {" "}
          First Time ?{" "}
          <button onClick={() => navigator("/register")}>Register</button>
        </span>
      </form>
    </div>
  );
}
