import "./Login.scss";
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function Login() {
  const [checker, setChecker] = useState(false);

  const userName = useRef(null);
  const userPassword = useRef(null);
  const wrong = useRef(null);
  function Check(evt) {
    evt.preventDefault();
    let objects = {
      user_name: userName.current.value,
      user_password: userPassword.current.value,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch("https://mokhimtihon.herokuapp.com/login", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m !== "false") {
          window.localStorage.setItem("token", m.token);
          setChecker(m.isAdmin);
        } else {
          console.log(wrong);
          wrong.current.textContent = "Invalid login or password";
        }
      });

    userName.current.value = null;
    userPassword.current.value = null;
  }
  if (checker == "super") {
    return <Redirect to="/superadmin" />;
  } else if (checker == "admin") {
    return <Redirect to="/admin" />;
  } else if (checker == "user") {
    return <Redirect to="/" />;
  }
  return (
    <>
      <section className="login">
        <div className="container">
          <h1 className="headerLogin">LOGIN TO YOUR ACCOUNT</h1>
          <form className="loginForm" onSubmit={Check}>
            <div className="loginWrapper">
              <input type="text" className="login" required ref={userName} />
              <i className="fas fa-sign-in-alt" />
            </div>
            <div className="passwordWrapper">
              <input
                type="password"
                className="password"
                required
                ref={userPassword}
              />
              <i className="fas fa-key" />
            </div>
            <button className="loginbtn" type="submit">
              LOGIN
            </button>
            <span className="haveaccount">
              If you do not have account yet, Please
            </span>
            <Link to="/register">
              <span className="jumpRegister">REGISTER</span>
            </Link>
            <h3 className="error" ref={wrong}></h3>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
