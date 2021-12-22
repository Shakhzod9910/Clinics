import "./Home.scss";
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
function Home() {
  let token = window.localStorage.getItem("token");
  const [clinics, setClinics] = useState([]);
  const [disabled, setdisablet] = useState(false);
  const [services, setServices] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [order, setOrder] = useState([true]);
  const isActiv = useRef(null);
  const cln = useRef(null);
  const myOrder2 = useRef(null);
  const homeRemove = useRef(null);
  const homeActive2 = useRef(null);
  const takeTurns = useRef(null);

  function normalizeDate(time) {
    var year = new Date(time).getFullYear();
    var month = String(new Date(time).getMonth() + 1).padStart(2, "0");
    var day = String(new Date(time).getDate()).padStart(2, "0");
    var hour = String(new Date(time).getHours()).padStart(2, "0");
    var minut = String(new Date(time).getMinutes()).padStart(2, "0");

    return day + "." + month + "." + year + " " + hour + ":" + minut;
  }

  useEffect(() => {
    fetch("https://mokhimtihon.herokuapp.com/")
      .then((data) => data.json())
      .then((m) => setClinics(m));
  }, []);
  const getId = (evt) => {
    let clinicId = evt.currentTarget.getAttribute("data");
    let clinicName = evt.currentTarget.getAttribute("data2");
    cln.current.textContent = clinicName + " services";
    let objects = {
      ref_clinic: clinicId,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch("https://mokhimtihon.herokuapp.com/services", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        setServices(m);
      });
    isActiv.current.classList.add("activ");
    homeRemove.current.classList.add("homeRemove");
  };
  const returnClinics = (evt) => {
    isActiv.current.classList.remove("activ");
    homeRemove.current.classList.remove("homeRemove");
    setServices(null);
  };

  const tekeOrder = (evt) => {
    let serviceId = evt.target.getAttribute("data3");
    if (!token) {
      setOrder(false);
    }
    let objects = {
      service_id: serviceId,
      token: token,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch("https://mokhimtihon.herokuapp.com/add/order", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m == "ok") {
          evt.target.textContent = "Done";
          evt.target.style.backgroundColor = "green";
          evt.target.style.color = "#fff";

          setdisablet(true);
        }
      });
  };
  const getOrders = (evt) => {
    myOrder2.current.classList.add("myOrdersActive");
    homeRemove.current.classList.add("homeRemove");
    let objects = {
      token: token,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch("https://mokhimtihon.herokuapp.com/user/getorders", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        setMyOrders(m);
      });
  };
  const homeActive = (evt) => {
    myOrder2.current.classList.remove("myOrdersActive");
    homeRemove.current.classList.remove("homeRemove");
  };
  if (!order) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <section className="Home" ref={homeRemove}>
        <div className="navbare">
          <div className="container">
            <div className="nav">
              <h1>Clinics</h1>
              <ul className="navlist">
                <li className="navListItems" onClick={getOrders}>
                  My Orders
                </li>
                <Link to="/login">
                  <li className="navListItems">Sign In</li>
                </Link>
                <Link to="/register">
                  <li className="navListItems">Sign Up</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="header">MEDICAL HELP CENTERS</h1>
        <div className="clinicLists container">
          <ul>
            {clinics &&
              clinics.map((item) => (
                <li
                  className="clinicListitems"
                  key={item.clinic_id}
                  data={item.clinic_id}
                  data2={item.clinic_name}
                  onClick={getId}
                >
                  <img src={item.clinic_img} alt="clinicfoto" />
                  <h2 className="clinicName">{item.clinic_name}</h2>
                  <span className="adress">{item.clinic_lacation}</span>
                  <span className="telNumber">{item.clinic_tel}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className="services" ref={isActiv}>
        <div className="navbar">
          <h1 ref={cln}></h1>
          <Link to="/">
            <span className="backClinics" onClick={returnClinics}>
              Return to clinics
            </span>
          </Link>
        </div>
        <h1 className="header">Select the service you need</h1>
        <ul className="serviceList">
          {services &&
            services.map((item) => (
              <li className="serviceListItem" key={item.ref_clinic}>
                <img src={item.service_img} alt="" />
                <h2>
                  <span>Service type:</span>
                  {item.service_title}
                </h2>
                <h3>
                  <span>Doctors name:</span>
                  {item.doctor_name}
                </h3>
                <span className="telNumber">
                  <span>Tel number:</span>
                  {item.doctor_tel}{" "}
                </span>
                <button
                  className="orderBtn"
                  onClick={tekeOrder}
                  data3={item.service_id}
                  disabled={disabled}
                  ref={takeTurns}
                >
                  Take turns
                </button>
              </li>
            ))}
        </ul>
      </section>
      <section className="myOrders" ref={myOrder2}>
        <div className="navbar">
          <div className="containerr">
            <h1>My orders</h1>
          </div>
          <span ref={homeActive2} onClick={homeActive}>
            Home
          </span>
        </div>
        <ul className="myOrdersList">
          {myOrders &&
            myOrders.map((item) => (
              <li className="myOrdersListItem" key={item.order_id}>
                <img src={item.service_img} alt={item.service_title} />
                <h2>
                  <p>Patient name:</p>
                  {item.user_name}
                </h2>
                <div className="serviceT">
                  <span className="serviceTitle">{item.service_title}</span>
                  <span className="turnTime">
                    {normalizeDate(item.order_time)}
                  </span>
                </div>
                <h3>
                  <p>Doctor name:</p>
                  {item.doctor_name}
                </h3>
                <div className="turnValue">
                  <span className="doctorTel">
                    <p>Doctor tel:</p>
                    {item.doctor_tel}
                  </span>
                  <p className="turnNumber">{item.order_number}</p>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
