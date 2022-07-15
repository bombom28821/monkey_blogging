import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: 20px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.grayDark};
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    &:focus {
      border-color: ${(props) => props.theme.primary};
    }
  }

  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({ type = "", name = "", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles>
      <input type={type} id={name} {...field} {...props} />
      {children && <span className="input-icon">{children}</span>}
    </InputStyles>
  );
};

export default Input;
