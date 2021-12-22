import "./Admin.scss";
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

function Admin() {
  let token = window.localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState([]);
  const [checkToken, setCheckToken] = useState([]);
  const [orders, setOrders] = useState([]);
  const [getClinic, setGetClinic] = useState([]);
  const [services, setServices] = useState([]);

  const serviceName = useRef(null);
  const doctorName = useRef(null);
  const serviceImg = useRef(null);
  const doctorTel = useRef(null);
  const clinicName = useRef(null);
  const addClinicModal = useRef(null);
  const clinicError = useRef(null);
  const isActiv = useRef(null);
  const removeAdminPage = useRef(null);

  useEffect(() => {
    let obj = {
      token: token,
    };
    fetch("https://mokhimtihon.herokuapp.com/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        setOrders(m);
      });
  }, []);

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
    let obj = {
      token: token,
    };
    fetch("https://mokhimtihon.herokuapp.com/getadmin/clinics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        setGetClinic(m);
      });
  }, []);

  useEffect(() => {
    if (token) {
      let checkToken2 = {
        token: token,
      };
      setCheckToken(checkToken2);
    }
  }, []);

  const deleteOrder = (evt) => {
    let orderId = evt.target.getAttribute("data");
    let objects = {
      order_id: orderId,
    };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch(
      "https://mokhimtihon.herokuapp.com/superadmin/order/delete",
      requestOptions
    )
      .then((data) => data.json())
      .then((m) => {
        if (m == "deleted") {
          evt.target.textContent = "Removed";
        }
      });
  };

  const addClinicb = (evt) => {
    addClinicModal.current.classList.add("addClinicActive");
  };
  const removeClinicActive = (evt) => {
    addClinicModal.current.classList.remove("addClinicActive");
  };

  function normalizeDate(time) {
    var year = new Date(time).getFullYear();
    var month = String(new Date(time).getMonth() + 1).padStart(2, "0");
    var day = String(new Date(time).getDate()).padStart(2, "0");
    var hour = String(new Date(time).getHours()).padStart(2, "0");
    var minut = String(new Date(time).getMinutes()).padStart(2, "0");

    return day + "." + month + "." + year + " " + hour + ":" + minut;
  }
  const sendService = (evt) => {
    evt.preventDefault();
    let obj = {
      service_title: serviceName.current.value,
      doctor_name: doctorName.current.value,
      service_img: serviceImg.current.value,
      doctor_tel: doctorTel.current.value,
      ref_clinic: clinicName.current.value,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("https://mokhimtihon.herokuapp.com/add/services", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m == "ok") {
          clinicError.current.textContent =
            "The service is successfully established";
        } else {
          clinicError.current.textContent = "Something wrong";
          clinicError.current.style.color = "crimson";
        }
      });
    serviceName.current.value = null;
    doctorName.current.value = null;
    serviceImg.current.value = null;
    doctorTel.current.value = null;
    clinicName.current.value = null;
  };
  const activeS = (evt) => {
    isActiv.current.classList.add("activS");
    removeAdminPage.current.classList.add("removeA");
    let obj = {
      token: token,
    };
    fetch("https://mokhimtihon.herokuapp.com/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        setServices(m);
      });
  };

  const rmoveAct = (evt) => {
    isActiv.current.classList.remove("activS");
    removeAdminPage.current.classList.remove("removeA");
  };

  const tekeOrder = (evt) => {
    let serviceId = evt.target.getAttribute("data3");
    let obj = {
      service_id: serviceId,
    };
    fetch("https://mokhimtihon.herokuapp.com/admin/delete/service", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        if (m == "ok") {
          evt.target.textContent = "Deleted";
          evt.target.style.backgroundColor = "#777";
        }
      });
  };

  if (!token) {
    return <Redirect to="/login" />;
  } else if (isAdmin == "super") {
    return <Redirect to="/login" />;
  } else if (isAdmin == "user") {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <section className="orders" ref={removeAdminPage}>
        <div className="navbar">
          <div className="containerr">
            <h1>ADMIN</h1>
            <span onClick={addClinicb}>Add services</span>
            <span className="sAdmin2" onClick={activeS}>
              Services
            </span>
          </div>
        </div>
        <div className="orderSection container">
          <h1>List of orders</h1>
          <ul className="orderslist">
            {orders &&
              orders.map((row) => (
                <li className="ordersListItem" key={row.order_id}>
                  <h2>{row.clinic_name}</h2>
                  <span className="service">
                    Secvice :
                    <span className="serviceName">{row.service_title}</span>
                  </span>
                  <div className="Doctor">
                    <span className="doctorName">
                      Doctor's name : <span>{row.doctor_name}</span>{" "}
                    </span>
                  </div>
                  <div className="patientInfo">
                    <span className="userInfo">
                      Patient name : <span>{row.user_name}</span>
                    </span>
                    <span className="tel">
                      {" "}
                      <span>Tel number :</span>
                      {row.user_tel}
                    </span>
                    <span className="userEmail">
                      {" "}
                      <span>Email :</span>
                      {row.user_gmail}
                    </span>
                  </div>
                  <span className="time">
                    Order time : <span>{normalizeDate(row.order_time)}</span>{" "}
                  </span>
                  <button
                    className="deletebtn"
                    data={row.order_id}
                    onClick={deleteOrder}
                  >
                    Remove this patient
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <div className="addClinics2" ref={addClinicModal}>
        <div className="backIcon" onClick={removeClinicActive}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h1 className="header">ENTER INFORMATION ABOUT THE SERVICE</h1>
        <form className="list" onSubmit={sendService}>
          <div className="adressWrapp">
            <input type="text" className="adress" required ref={serviceName} />
            <i className="fas fa-ambulance"></i>
          </div>

          <div className="fotoWrapp">
            <input type="text" className="foto" required ref={serviceImg} />
            <i className="fas fa-image" />
          </div>
          <div className="costWrapp">
            <input type="text" className="cost" required ref={doctorName} />
            <i className="fas fa-user-nurse"></i>
          </div>
          <div className="phoneWrapp">
            <input
              type="number"
              className="phone"
              required
              placeholder="+998*********"
              ref={doctorTel}
            />
            <i className="fas fa-phone" />
          </div>

          <div className="measureWrapp">
            <select type="text" className="measures" required ref={clinicName}>
              {getClinic &&
                getClinic.map((item) => (
                  <option key={item.clinic_id} value={item.clinic_id}>
                    {item.clinic_name}
                  </option>
                ))}
            </select>
            <i className="fas fa-clinic-medical"></i>
          </div>
          <button className="submitAdBtn" type="submit">
            SUBMIT
          </button>
        </form>
        <h3 className="clinicError" ref={clinicError}></h3>
      </div>
      <section className="servicesAdmin" ref={isActiv}>
        <div className="navbar">
          <h1>Services</h1>
          <span className="backClinics" onClick={rmoveAct}>
            Main
          </span>
        </div>
        <ul className="serviceList">
          {services &&
            services.map((item) => (
              <li className="serviceListItem" key={item.service_id}>
                <img src={item.service_img} alt="" />
                <h2>
                  <span>Service type:</span>
                  {item.service_title}
                </h2>
                <h3>
                  <span>Clinic name:</span>
                  {item.clinic_name}
                </h3>
                <span className="telNumber">
                  <span>Doctor name:</span>
                  {item.doctor_name}
                </span>
                <button
                  className="orderBtn"
                  onClick={tekeOrder}
                  data3={item.service_id}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}

export default Admin;
