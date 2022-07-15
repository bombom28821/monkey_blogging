import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 20px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.grayDark};
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    resize: none;
    width: 100%;
    height: 200px;
    &:focus {
      border-color: ${(props) => props.theme.primary};
    }
  }

  textarea::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  textarea::-moz-input-placeholder {
    color: #b2b3bd;
  }
`;
const Textarea = ({ type = "", name = "", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea type={type} id={name} {...field} {...props} />
      {children && <span className="input-icon">{children}</span>}
    </TextareaStyles>
  );
};

export default Textarea;
