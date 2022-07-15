import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Input, InputTogglePassword } from "../components/input";
import { Label } from "../components/label";
import Authentication from "./Authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
const schemaValidation = yup.object({
  email: yup
    .string()
    .required("Field email is empty")
    .email("Field email is invalid"),
  password: yup.string().min(8, "Field password must be 8 characters at least"),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
      toast.success("Login success!");
    } catch (err) {
      toast.error("Not found account in firebase");
    }
  };
  useEffect(() => {
    document.title = "Login Page";
    const errorsArray = Object.values(errors);
    if (errorsArray.length > 0) {
      toast.error(errorsArray[0].message, {
        delay: 0,
        pauseOnHover: false,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <Authentication>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            placeholder="Enter your email..."
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputTogglePassword control={control}></InputTogglePassword>
        </Field>
        <div className="have-account">
          You have not had an account?{" "}
          <NavLink to={"/sign-up"} className="text-primary">
            Register an account
          </NavLink>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full max-w-[300px] mx-auto"
        >
          Login
        </Button>
      </form>
    </Authentication>
  );
};

export default SignInPage;
