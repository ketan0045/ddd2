import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../Redux/Action/authAction";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner/Spinner";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import handleKeyDown from "../../common/validation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const LoginLink = styled.div`
  margin-top: 20px;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.app);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    useremail: "",
    userpassword: "",
  };

  const validationSchema = Yup.object({
    useremail:Yup.string()
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
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const resultAction = await dispatch(loginUser(values)).unwrap();
      localStorage.setItem("token",resultAction.result.token);
      if (resultAction.status === 201) {
        toast.success("Login successful!");
        resetForm();
        navigate("/dashboard");
      } else {
        toast.error("Unexpected response status");
      }
    } catch (error) {
      toast.error(error.error || "Login failed");
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
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <label htmlFor="useremail">Email</label>
            <StyledField
              name="useremail"
              type="email"
              placeholder="Enter Your useremail Address"
              onKeyDown={(event) => {
                if (event.key === " ") {
                  event.preventDefault();
                }
              }}
            />
            <ErrorMessage name="useremail" component={ErrorMessageDiv} />

            <label htmlFor="userpassword">Password</label>
            <PasswordContainer>
              <StyledField
                name="userpassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your userpassword"
                onKeyDown={handleKeyDown}
              />
              <TogglePasswordIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordIcon>
            </PasswordContainer>
            <ErrorMessage name="userpassword" component={ErrorMessageDiv} />
            <StyledButton
              type="submit"
              style={{ width: "105%" }}
              disabled={loading || isSubmitting}
            >
              {loading ? (
                <>
                  Login...
                  <Spinner />
                </>
              ) : (
                "Login"
              )}
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
      <LoginLink>
        Don't have an account? <Link to="/register">Register here</Link>
      </LoginLink>
    </FormContainer>
  );
};

export default Login;
