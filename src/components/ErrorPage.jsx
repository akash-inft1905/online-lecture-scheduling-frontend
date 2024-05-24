import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>
        Oops! Something went wrong or You have can be on incorrect url
      </ErrorMessage>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    circle,
    rgba(198, 255, 157, 1) 0%,
    rgba(155, 128, 242, 0.5663515406162465) 100%
  );
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  color: black;
  margin-bottom: 20px;
`;

export default ErrorPage;
