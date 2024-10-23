import "./App.css";
import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

const formContext = createContext();
function FormProvider({ children }) {
  const [petType, setPetType] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [petDetails, setPetDetails] = useState([]);

  return (
    <formContext.Provider
      value={{
        petDetails: petDetails,
        setPetDetails: setPetDetails,
        petType: petType,
        setPetType: setPetType,
        email: email,
        setEmail: setEmail,
        num: num,
        setNum: setNum,
        name: name,
        setName: setName,
        petName: petName,
        setPetName: setPetName,
        setBreed: setBreed,
        breed: breed,
      }}
    >
      {children}
    </formContext.Provider>
  );
}
function App() {
  return (
    <>
      <BrowserRouter basename="/PetAdoption-APP_Project-P4/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/form" element={<Form />}></Route>
            <Route path="/table" element={<Table />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <div className="layout">
      <div className="header">{<Header />}</div>
      <div className="main">
        <FormProvider>
          <Outlet />
        </FormProvider>
      </div>
      <div className="footer">{<Footer />}</div>
    </div>
  );
}



function Table() {
  const navigate = useNavigate();
  const { petDetails } = useContext(formContext);
  function navHome() {
    navigate("/");
  }
  function navForm() {
    navigate("/form");
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {petDetails.length > 0 ? (
          <>
            <h2 style={{ marginTop: "35px" }}>Submitted Pet Details</h2>
            <table
              style={{
                borderCollapse: "collapse",
                width: "80%",
                marginTop: "40px",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Pet Name</th>
                  <th style={thStyle}>Pet Type</th>
                  <th style={thStyle}>Breed</th>
                  <th style={thStyle}>Owner's Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {petDetails.map((detail, index) => (
                  <tr key={index}>
                    <td style={thStyle}>{detail.petName}</td>
                    <td style={thStyle}>{detail.petType}</td>
                    <td style={thStyle}>{detail.breed}</td>
                    <td style={thStyle}>{detail.name}</td>
                    <td style={thStyle}>{detail.email}</td>
                    <td style={thStyle}>{detail.num}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div style={{ marginTop: "80px" }}>
            <h1>No pet details submitted yet</h1>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <button className="button" onClick={navHome}>
          Home
        </button>
        <button className="button" onClick={navForm}>
          Fill Details
        </button>
      </div>
    </div>
  );
}

function Form() {
  const navigate = useNavigate();
  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [petNameErr, setPNameErr] = useState("");
  const [numErr, setNumErr] = useState("");
  const [submit, setSubmit] = useState(false);
  const {
    setPetDetails,
    petType,
    setPetType,
    setEmail,
    setNum,
    setName,
    setPetName,
    setBreed,
    petName,
    breed,
    name,
    num,
    email,
  } = useContext(formContext);

  function backToForm() {
    setPetDetails([]);
    setSubmit(false);
    setEmail("");
    setNum("");
    setName("");
    setPetName("");
    setBreed("");
    setPetType("");

    navigate("/form");
  }

  function seeTable() {
    navigate("/table");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const newDetails = {
      petName: petName,
      petType: petType,
      breed: breed,
      name: name,
      num: num,
      email: email,
    };
    setPetDetails((prevDetails) => [...prevDetails, newDetails]);
    setSubmit(true);
  };
  const handlePetTypeChange = (event) => {
    setPetType(event.target.value);
    setBreed("");
  };
  const handleBreed = (event) => {
    setBreed(event.target.value);
  };

  const validateName = (name) => {
    const namePattern = /^(?=.{3,})([A-Za-z]+(?:\s[A-Za-z]+)*)$/;
    return namePattern.test(name);
  };

  function handleNameChange(event) {
    const inputName = event.target.value;

    setName(inputName);

    if (!validateName(inputName)) {
      setNameErr("Name must be atleast 3 character long");
    } else {
      setNameErr("");
    }
  }
  function handlePNameChange(event) {
    const inputName = event.target.value;

    setPetName(inputName);

    if (!validateName(inputName)) {
      setPNameErr("Name must be atleast 3 character long");
    } else {
      setPNameErr("");
    }
  }
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  function handleEmailChange(event) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    if (!validateEmail(inputEmail)) {
      setEmailErr("Please give a valid email address");
    } else {
      setEmailErr("");
    }
  }

  const numValidate = (num) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(num);
  };
  function handleNumChange(event) {
    const inputNum = event.target.value;
    setNum(inputNum);
    if (!numValidate(inputNum)) {
      setNumErr("Phone number should be 10 digis");
    } else {
      setNumErr("");
    }
  }

  return (
    <div style={formDivStyle}>
      {!submit ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="form"
        >
          <h2>Please fill the deatils of PET</h2>
          <div>
            <span style={{ marginRight: "15px" }}>Pet Name</span>
            <input
              type="text"
              style={inputStyle}
              onChange={handlePNameChange}
            />
          </div>
          {petNameErr ? (
            <span style={{ color: "red" }}>Name must be 3 Characters long</span>
          ) : (
            ""
          )}
          <div>
            <span style={{ marginRight: "20px" }}>Pet Type</span>
            <select style={selectStyle} onChange={handlePetTypeChange}>
              <option value="">Select Pet Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="cat">Rabbit</option>
              <option value="cat">Bird</option>
              <option value="cat">Fish</option>
            </select>
          </div>
          <div>
            <span style={{ marginRight: "30px" }}>Breed</span>
            <select
              style={selectStyle}
              disabled={!petType}
              onChange={handleBreed}
            >
              <option value="">Select Breed</option>
              {petType &&
                breedOptions[petType]?.map((breedOption, index) => (
                  <option key={index} value={breedOption}>
                    {breedOption}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <span>Your Name</span>
            <input type="text" style={inputStyle} onChange={handleNameChange} />
          </div>
          {nameErr ? (
            <span style={{ color: "red" }}>Name must be 3 Characters long</span>
          ) : (
            ""
          )}
          <div>
            <span style={{ marginRight: "35px" }}>Email</span>
            <input
              type="email"
              style={inputStyle}
              onChange={handleEmailChange}
            />
          </div>
          {emailErr ? <span style={{ color: "red" }}>{emailErr}</span> : ""}
          <div>
            <span style={{ marginRight: "35px" }}>Phone</span>
            <input type="tel" style={inputStyle} onChange={handleNumChange} />
          </div>
          {numErr ? <span style={{ color: "red" }}>{numErr}</span> : ""}
          <button
            className="button"
            onClick={handleSubmit}
            style={{ marginLeft: "10px", marginTop: "5px" }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "80px" }}>
          <h1>Details Submited</h1>
        </div>
      )}
      <div>
        <button
          className="button"
          onClick={seeTable}
          style={{ marginTop: "80px" }}
        >
          See the Table
        </button>
        {submit ? (
          <button
            className="button"
            onClick={backToForm}
            style={{ marginTop: "80px", marginLeft: "100px" }}
          >
            Add More
          </button>
        ) : null}
      </div>
    </div>
  );
}

const thStyle = {
  border: "1px solid black",
  padding: "8px",
  backgroundColor: "#F5F5F5",
};

const formDivStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  marginTop: "25px",
};
const inputStyle = {
  width: "400px",
  padding: "10px",
  margin: "12px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const selectStyle = {
  ...inputStyle,
  appearance: "none",
  backgroundSize: "15px",
};

const breedOptions = {
  dog: [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "French Bulldog",
    "Poodle",
    "Bulldog",
    "Beagle",
    "Rottweiler",
  ],
  cat: [
    "Persian",
    "Maine Coon",
    "Siamese",
    "Bengal",
    "Sphynx",
    "Ragdoll",
    "Scottish Fold",
    "British Shorthair",
  ],
  bird: [
    "Parakeet",
    "Cockatiel",
    "Canary",
    "Finch",
    "Lovebird",
    "African Grey",
    "Macaw",
  ],
  rabbit: [
    "Holland Lop",
    "Netherland Dwarf",
    "Mini Rex",
    "Lionhead",
    "English Angora",
  ],
  fish: ["Goldfish", "Betta", "Angelfish", "Guppy", "Tetra", "Cichlid"],
};

const mainPageStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  marginTop: "100px",
  fontSize: "1.2rem",
  gap: "10px",
};

function HomePage() {
  const navigate = useNavigate();
  function formFill() {
    navigate("/form");
  }
  return (
    <div style={mainPageStyle}>
      <h2>Welcome to Pet Adoption Hub!</h2>
      <p
        style={{
          width: "50%",
          textAlign: "center",
          lineHeight: "1.5",
          wordSpacing: "4px",
          fontWeight: "300"
        }}
      >
        Find your perfect furry friend!
        <br />
        Our mission is to connect loving homes with wonderful pets in need of
        adoption.
        <br />
        Every adoption gives a pet a second chance at life!
        <br />
        Let's fill the details
      </p>
      <button
        className="button"
        onClick={formFill}
        style={{ marginTop: "50px" }}
      >
        Add New
      </button>
    </div>
  );
}

function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1>Your New Best Friend Awaits: Adopt Pet Today!</h1>
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%"
      }}
    >
      <div style={{ display: "flex", gap: "5px", marginLeft: "50px" }}>
        <h1>Build by-</h1>
        <h1 style={{ color: "#d35908" }}> Susovan Das</h1>
        <h1>With</h1>
        <img
          src="https://skillicons.dev/icons?i=react"
          style={{ width: "30px", height: "30px", marginTop: "5px" }}
        />
      </div>
      <div style={{ display: "flex", gap: "40px", marginRight: "50px" }}>
        <Link
          to={"https://www.linkedin.com/in/susovan-das-b927b7254/"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i
            className="ri-linkedin-box-fill"
            style={{ fontSize: "35px", color: "black" }}
          ></i>
        </Link>
        <Link
          to={"https://github.com/SusovanDas19"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i
            class="ri-github-fill"
            style={{ fontSize: "35px", color: "black" }}
          ></i>
        </Link>
      </div>
    </div>
  );
}

export default App;
