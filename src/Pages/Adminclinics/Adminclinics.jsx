import "./Adminclinics.scss";

import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

function Adminclinics() {
  let token = window.localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState([]);
  const [checkToken, setCheckToken] = useState([]);
  const [clinics, setClinics] = useState([]);
  const del = useRef(null);

  useEffect(() => {
    fetch("https://mokhimtihon.herokuapp.com/tokenchecker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkToken),
    })
      .then((data) => data.json())
      .then((m) => {
        setIsAdmin(m);
      });
  }, [checkToken]);

  useEffect(() => {
    if (token) {
      let checkToken2 = {
        token: token,
      };
      setCheckToken(checkToken2);
    }
  }, []);

  useEffect(() => {
    fetch("https://mokhimtihon.herokuapp.com/")
      .then((data) => data.json())
      .then((m) => setClinics(m));
  }, []);
  const deleteClinic = (evt) => {
    let getClinicId = evt.currentTarget.getAttribute("data");
    let obj = {
      clinic_id: getClinicId,
    };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch(
      "https://mokhimtihon.herokuapp.com/superadmin/delete/clinics",
      requestOptions
    )
      .then((data) => data.json())
      .then((m) => {
        if (m == "deleted") {
          evt.target.textContent = "Deleted";
          evt.target.style.backgroundColor = "#777";
        }
      });
  };
  if (!token) {
    return <Redirect to="/login" />;
  } else if (isAdmin == "admin") {
    return <Redirect to="/login" />;
  } else if (isAdmin == "user") {
    return <Redirect to="/login" />;
  }
  return (
    <section className="orders">
      <div className="navbar">
        <div className="containerr">
          <h1>SUPER ADMIN</h1>
          <Link to="/superadmin">
            <span>Main</span>
          </Link>
        </div>
      </div>
      <div className="orderSection container">
        <h1>List of Clinics</h1>
        <ul className="adminClinicList">
          {clinics &&
            clinics.map((item) => (
              <li className="clinicListitems" key={item.clinic_id}>
                <img src={item.clinic_img} alt="clinicfoto" />
                <h2 className="clinicName">{item.clinic_name}</h2>
                <span className="adress">{item.clinic_lacation}</span>
                <span className="telNumber">{item.clinic_tel}</span>
                <button
                  className="deleteclinicBtn"
                  onClick={deleteClinic}
                  data={item.clinic_id}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default Adminclinics;
