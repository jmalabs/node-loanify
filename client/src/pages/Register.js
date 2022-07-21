import React, { useState } from "react";
import styled from "styled-components";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
};

function Register() {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { isLoading, showAlert, displayAlert } = useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, name, password, isMember } = values;

    if (!email || !name || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            handleChange={handleChange}
            value={values.name}
          />
        )}

        <FormRow
          name="email"
          type="email"
          handleChange={handleChange}
          value={values.email}
        />
        <FormRow
          name="password"
          type="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button type="submit" className="btn btn-block" onClick={onSubmit}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

// const Wrapper = styled.div`
//   form {
//     width: 400px;
//     border-top: 5px solid var(--primary-500);
//     padding: 2rem 2.5rem;
//     margin: 3rem auto;
//     background: var(--white);
//     border-radius: var(--borderRadius);
//     box-shadow: var(--shadow-2);
//     max-width: 400px;

//     .logo {
//       margin: 0 auto;
//       display: block;
//     }

//     h3 {
//       text-align: center;
//     }

//     input {
//       padding: 1rem;
//     }
//   }
// `;
export default Register;
