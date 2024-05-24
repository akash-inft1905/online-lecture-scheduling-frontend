import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);

  return (
    <div className="background">
      <MainContainer>
        <Overlay>
          <Message>Welcome to Course Schedule</Message>
          <ButtonContainer>
            <Button onClick={handleLoginClick}>Login</Button>
            <Button onClick={handleRegisterClick}>Register</Button>
          </ButtonContainer>
        </Overlay>
      </MainContainer>
    </div>
  );
};

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://media.istockphoto.com/id/918273928/vector/digital-network-background.jpg?s=612x612&w=0&k=20&c=hxO1QYmP19QksfNrKJzu9R6gqmMWm3zHIlMcblO_HgE="); /* Light blue-gray background */
  background-repeat: no-repeat;
  background-size: cover;
`;

const Overlay = styled.div`
  background-color: #bcd7dd;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.h1`
  font-size: 28px;
  margin-bottom: 85px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  padding: 15px;
  background-color: black; /* Elegant purple */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #534f9a; /* Darker shade on hover */
  }
`;

export default Main;
