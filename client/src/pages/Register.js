import React, { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, name, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      const result = await setupUser({
        data: currentUser,
        apiPath: "auth/login",
        alertMessage: "Login Successful. Redirecting...",
        isRegister: false,
      });

      if (result === true) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } else {
      const result = await setupUser({
        data: currentUser,
        apiPath: "auth/register",
        alertMessage: "User Created Successfully. Please login.",
        isRegister: true,
      });

      if (result === true) {
        setValues({ ...values, isMember: true, email: "", password: "" });
      }
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // useEffect(() => {
  //   console.log("Login", user);
  //   if (user && values.isMember) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 3000);
  //   }
  // }, [user, navigate, values.isMember]);

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
        <button
          type="submit"
          className="btn btn-block"
          onClick={onSubmit}
          disabled={isLoading}>
          {values.isMember ? "Login" : "Register"}
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

export default Register;
