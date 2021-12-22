import "./Register.scss";
import { Redirect } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function Register() {
  const [checker, setChecker] = useState(false);
  const userName = useRef(null);
  const userPassword = useRef(null);
  const userEmail = useRef(null);
  const userTel = useRef(null);
  const wrong = useRef(null);
  function Check(evt) {
    evt.preventDefault();
    let isAdm = "user";
    let objects = {
      user_name: userName.current.value,
      user_password: userPassword.current.value,
      user_gmail: userEmail.current.value,
      user_tel: userTel.current.value,
      is_admin: isAdm,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch("https://mokhimtihon.herokuapp.com/register", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m !== "false") {
          console.log(m);
          window.localStorage.setItem("token", m);
          setChecker(true);
        } else {
          console.log(wrong);
          wrong.current.textContent = "This username already exist";
        }
      });

    userName.current.value = null;
    userPassword.current.value = null;
    userEmail.current.value = null;
    userTel.current.value = null;
  }
  if (checker == true) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <section className="register">
        <div className="container">
          <h1 className="headerLogin">PLEASE REGISTER</h1>
          <form className="registrationForm" onSubmit={Check}>
            <div className="loginWrapper">
              <input type="text" className="name" required ref={userName} />
              <i className="far fa-user" />
            </div>
            <div className="passwordWrapper passwordWrappers">
              <input
                type="password"
                className="password"
                required
                ref={userPassword}
              />
              <i className="fas fa-key" />
            </div>
            <div className="emailWrapper">
              <input type="email" className="email" required ref={userEmail} />
              <i className="far fa-envelope" />
            </div>

            <div className="phonenWrapper ">
              <input
                type="tel"
                className="password"
                placeholder="+998*********"
                required
                ref={userTel}
              />
              <i class="fas fa-phone"></i>
            </div>
            <button className="loginbtn" type="submit">
              SUBMIT
            </button>
            <span className="exist" />
            <h3 className="error" ref={wrong}></h3>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
