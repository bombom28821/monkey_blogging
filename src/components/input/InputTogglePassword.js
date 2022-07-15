import React, { useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputTogglePassword = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Input
      type={`${togglePassword ? "text" : "password"}`}
      name="password"
      className="input"
      placeholder="Enter your password..."
      control={control}
    >
      {!togglePassword ? (
        <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
      ) : (
        <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
      )}
    </Input>
  );
};

export default InputTogglePassword;
