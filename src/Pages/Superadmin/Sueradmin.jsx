import "./Superadmin.scss";
import React, { useEffect, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";

function Superadmin() {
  let token = window.localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [checkToken, setCheckToken] = useState([]);
  const [admins2, setAdmins2] = useState([]);

  const addAdmin = useRef(null);
  const modalReg = useRef(null);
  const adminName = useRef(null);
  const adminPass = useRef(null);
  const adminMail = useRef(null);
  const cilincName = useRef(null);
  const cilincaLocation = useRef(null);
  const cilincaImg = useRef(null);
  const cilincaTel = useRef(null);
  const cilincaAdmin = useRef(null);
  const addClinicModal = useRef(null);
  const adminPhone = useRef(null);
  const error = useRef(null);
  const clinicError = useRef(null);

  useEffect(() => {
    fetch("https://mokhimtihon.herokuapp.com/superadmin/users")
      .then((data) => data.json())
      .then((m) => setUsers(m));
  }, []);

  useEffect(() => {
    fetch("https://mokhimtihon.herokuapp.com/admins")
      .then((data) => data.json())
      .then((m) => setAdmins2(m));
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
  const deleteUser = (evt) => {
    let userId = evt.target.getAttribute("data");
    let objects = {
      user_id: userId,
    };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objects),
    };
    fetch(
      "https://mokhimtihon.herokuapp.com/superadmin/user/delete",
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

  let i = 1;
  useEffect(() => {
    if (token) {
      let checkToken2 = {
        token: token,
      };
      setCheckToken(checkToken2);
    }
  }, []);
  if (!token) {
    return <Redirect to="/login" />;
  } else if (isAdmin == "admin") {
    return <Redirect to="/login" />;
  } else if (isAdmin == "user") {
    return <Redirect to="/login" />;
  }
  // const isActiv = useRef(null);

  const addadMIn = (evt) => {
    modalReg.current.classList.add("addadminActive");
  };

  const removeActive = (evt) => {
    modalReg.current.classList.remove("addadminActive");
  };

  const sendData = (evt) => {
    evt.preventDefault();
    let isA = "admin";
    let objAdmin = {
      user_name: adminName.current.value,
      user_password: adminPass.current.value,
      user_gmail: adminMail.current.value,
      user_tel: adminPhone.current.value,
      is_admin: isA,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objAdmin),
    };
    fetch("https://mokhimtihon.herokuapp.com/register", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m !== false) {
          error.current.textContent = "Admin is succasfully created";
          error.current.style.color = "green";
        } else {
          error.current.textContent = "This admin is alrady exist";
        }
      });
    adminName.current.value = null;
    adminPass.current.value = null;
    adminMail.current.value = null;
    adminPhone.current.value = null;
  };

  const addClinicb = (evt) => {
    addClinicModal.current.classList.add("addClinicActive");
  };
  const removeClinicActive = (evt) => {
    addClinicModal.current.classList.remove("addClinicActive");
  };

  const sendClinic = (evt) => {
    evt.preventDefault();
    let obj = {
      clinic_name: cilincName.current.value,
      clinic_location: cilincaLocation.current.value,
      clinic_img: cilincaImg.current.value,
      clinic_tel: cilincaTel.current.value,
      clinic_admin: cilincaAdmin.current.value,
    };
    console.log(obj);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch(
      "https://mokhimtihon.herokuapp.com/superadmin/addclinics",
      requestOptions
    )
      .then((data) => data.json())
      .then((m) => {
        if (m == "ok") {
          clinicError.current.textContent =
            "The clinic is successfully established";
        } else {
          clinicError.current.textContent = "Something wrong";
          clinicError.current.style.color = "crimson";
        }
      });
    cilincName.current.value = null;
    cilincaLocation.current.value = null;
    cilincaImg.current.value = null;
    cilincaTel.current.value = null;
    cilincaAdmin.current.value = null;
  };

  return (
    <>
      <section className="superadmin">
        <div className="navbar">
          <div className="container">
            <h1>SUPER ADMIN</h1>

            <Link to="/orders">
              <span className="order2">Orders</span>
            </Link>
            <Link to="/adminclinics">
              <span className="clinic3">Clinics</span>
            </Link>
            <span className="add2" ref={addAdmin} onClick={addadMIn}>
              Add Admin
            </span>
            <span className="clinic2" onClick={addClinicb}>
              Add Clinic
            </span>
          </div>
        </div>
        <div className="containeri">
          <h1>List of users</h1>
          <li className="listItems  defaultNames">
            <span className="listNumber">No</span>
            <span className="name">Name</span>
            <span className="id">Tel number</span>
            <span className="salery">Email</span>
            <span className="isAdmin">Role</span>
          </li>
          <ul className="listUser">
            {users &&
              users.map((row) => (
                <li className="listItems" key={row.user_id}>
                  <span className="count">{i++}</span>
                  <span className="usName">{row.user_name}</span>
                  <span className="id">{row.user_tel}</span>
                  <span className="forbtn">
                    <span className="usEmail">{row.user_gmail}</span>{" "}
                    <button
                      className="btndelete"
                      data={row.user_id}
                      onClick={deleteUser}
                    >
                      Delete
                    </button>
                  </span>
                  <span className="role">{row.is_admin}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className="register adminRegister" ref={modalReg}>
        <div className="backIcon" onClick={removeActive}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="container">
          <h1 className="headerLogin">ADD ADMIN</h1>
          <form className="registrationForm" onSubmit={sendData}>
            <div className="loginWrapper">
              <input type="text" className="name" required ref={adminName} />
              <i className="far fa-user" />
            </div>
            <div className="passwordWrapper passwordWrappers">
              <input
                type="password"
                className="password"
                required
                ref={adminPass}
              />
              <i className="fas fa-key" />
            </div>
            <div className="emailWrapper">
              <input type="email" className="email" required ref={adminMail} />
              <i className="far fa-envelope" />
            </div>

            <div className="phonenWrapper ">
              <input
                type="tel"
                className="password"
                placeholder="+998*********"
                required
                ref={adminPhone}
              />
              <i className="fas fa-phone"></i>
            </div>
            <button className="loginbtn" type="submit">
              SUBMIT
            </button>
            <h3 className="error" ref={error}></h3>
          </form>
        </div>
      </section>

      <div className="addClinics2" ref={addClinicModal}>
        <div className="backIcon" onClick={removeClinicActive}>
          <i className="fas fa-arrow-left"></i>
        </div>

        <h1 className="header">ENTER INFORMATION ABOUT THE CLINIC</h1>
        <form className="list" onSubmit={sendClinic}>
          <div className="adressWrapper">
            <input type="text" className="adress" required ref={cilincName} />
            <i className="fas fa-clinic-medical"></i>
          </div>
          <div className="costWrapper">
            <input
              type="text"
              className="cost"
              required
              ref={cilincaLocation}
            />
            <i className="fas fa-map-marker-alt" />
          </div>
          <div className="fotoWrapper">
            <input type="text" className="foto" required ref={cilincaImg} />
            <i className="fas fa-image" />
          </div>
          <div className="phoneWrapper">
            <input
              type="number"
              className="phone"
              required
              placeholder="+998*********"
              ref={cilincaTel}
            />
            <i className="fas fa-phone" />
          </div>
          <div className="measureWrapper">
            <select
              type="text"
              className="measures"
              required
              ref={cilincaAdmin}
            >
              {admins2 &&
                admins2.map((item) => (
                  <option key={item.user_id} value={item.user_id}>
                    {item.user_name}
                  </option>
                ))}
            </select>
            <i className="fas fa-user-cog"></i>
          </div>
          <button className="submitAdBtn" type="submit">
            SUBMIT
          </button>
        </form>
        <h3 className="clinicError" ref={clinicError}></h3>
      </div>
    </>
  );
}

export default Superadmin;
