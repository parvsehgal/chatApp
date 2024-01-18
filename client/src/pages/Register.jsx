import { useState } from "react";
import { registerAPi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/register.css";

export default function Register() {
  const navigator = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(form);
  };

  const submintHandler = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("the passwords do not match");
      return;
    } else if (form.name.length <= 4) {
      alert("username should be atleast 5 letters long");
    }
    const response = await axios.post(registerAPi, form);
    console.log(response.data.msg);
    if (response.data.stat == 200) {
      alert("Registered sucessfully");
    } else {
      alert(response.data.msg);
      return;
    }
  };

  return (
    <div className="registerWrapper">
      <form onSubmit={submintHandler} className="regForm">
        <h2>Register</h2>

        <input placeholder="name" name="name" onChange={changeHandler}></input>
        <input
          placeholder="email"
          name="email"
          onChange={changeHandler}
        ></input>
        <input
          placeholder="password"
          name="password"
          onChange={changeHandler}
        ></input>
        <input
          placeholder="confirm oassword"
          name="confirmPassword"
          onChange={changeHandler}
        ></input>
        <button type="submit">Register</button>
        <span className="registerSpan">
          {" "}
          alredy registered ?{" "}
          <button onClick={() => navigator("/login")}>login</button>
        </span>
      </form>
    </div>
  );
}
