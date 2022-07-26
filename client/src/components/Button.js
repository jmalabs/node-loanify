import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  margin-right: 1rem;
`;
const Button = ({ text }) => {
  return (
    <Wrapper className="btn btn-primary" type="button">
      {text}
    </Wrapper>
  );
};

export default Button;
