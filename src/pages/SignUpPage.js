import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Input, InputTogglePassword } from "../components/input";
import { Label } from "../components/label";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
const schemaValidation = yup.object({
  fullname: yup.string().required("Field fullname is empty"),
  email: yup
    .string()
    .required("Field email is empty")
    .email("Field email is invalid"),
  password: yup.string().min(8, "Field password must be 8 characters at least"),
});
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    });
    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, {
        lower: true,
      }),
      avatar:
        "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createAt: serverTimestamp(),
    });
    toast.success("Register user successfully!");
    navigate("/");
  };
  useEffect(() => {
    const errorsArray = Object.values(errors);
    if (errorsArray.length > 0) {
      toast.error(errorsArray[0].message, {
        delay: 0,
        pauseOnHover: false,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <Authentication>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname..."
            control={control}
          ></Input>
        </Field>
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
          You already have an account?{" "}
          <NavLink to={"/sign-in"} className="text-primary">
            Login
          </NavLink>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{
            width: 300,
            margin: "0 auto",
          }}
        >
          Sign Up
        </Button>
      </form>
    </Authentication>
  );
};

export default SignUpPage;
