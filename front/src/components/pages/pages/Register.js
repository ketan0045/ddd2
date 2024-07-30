import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../Redux/Action/authAction";
import styled from "styled-components";
import Spinner from "../../common/Spinner/Spinner";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import handleKeyDown from "../../common/validation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const StyledForm = styled(Form)`
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const StyledPasswordField = styled(Field)`
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessageDiv = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TogglePasswordIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .test(
      "no-whitespace",
      "Username cannot be empty or contain only spaces",
      (value) => value.trim() !== ""
    )
    .max(25, "Name must be less than 25 characters"),
  useremail: Yup.string()
  .matches(
    /^[^A-Z][-!#$%&'*+\/0-9=?^_`{|}~]*(\.?[^A-Z][-!#$%&'*+\/0-9=?^_`{|}~]*)*@[a-z0-9](-*\.?[a-z0-9])*\.[a-z](-?[a-z0-9])+$/,
    "Enter a valid useremail"
  )
  .required("useremail is required"),
  userpassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .test(
      "no-whitespace",
      "Password cannot contain leading or trailing spaces",
      (value) => value === value.trim()
    ),
  usercpassword: Yup.string()
    .oneOf([Yup.ref("userpassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  username: "",
  useremail: "",
  userpassword: "",
  usercpassword: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.app);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const resultAction = await dispatch(registerUser(values)).unwrap();

      if (resultAction.status === 201) {
        toast.success("Registration successful!");
        toast.success(resultAction.message);
        resetForm();
        navigate("/");
      } else {
        toast.error("Unexpected response status");
      }
    } catch (error) {
      toast.error(error.error || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <h2 style={{ textAlign: "center" }}>Register</h2>

            <label htmlFor="username">Username</label>
            <StyledField
              name="username"
              type="text"
              placeholder="Enter your username"
              onKeyDown={handleKeyDown}
            />
            <ErrorMessage name="username" component={ErrorMessageDiv} />

            <label htmlFor="useremail">Email</label>
            <StyledField
              name="useremail"
              type="email"
              placeholder="Enter your email"
              onKeyDown={(event) => {
                if (event.key === " ") {
                  event.preventDefault();
                }
              }}
            />
            <ErrorMessage name="useremail" component={ErrorMessageDiv} />

            <label htmlFor="userpassword">Password</label>
            <PasswordContainer>
              <StyledPasswordField
                name="userpassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onKeyDown={handleKeyDown}
                style={{width:"100%"}}
              />
              <TogglePasswordIcon
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordIcon>
            </PasswordContainer>
            <ErrorMessage name="userpassword" component={ErrorMessageDiv} />

            <label htmlFor="usercpassword">Confirm Password</label>
            <PasswordContainer>
              <StyledPasswordField
                name="usercpassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                onKeyDown={handleKeyDown}
                style={{width:"100%"}}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordButton>
            </PasswordContainer>
            <ErrorMessage name="usercpassword" component={ErrorMessageDiv} />

            <StyledButton
              type="submit"
              style={{ width: "105%" }}
              disabled={loading || isSubmitting}
            >
              {loading ? (
                <>
                  Registering...
                  <Spinner />
                </>
              ) : (
                "Register"
              )}
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Register;
