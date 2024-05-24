import React from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";
import IndividualCourse from "../IndividualCourse";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <WelcomeContainer>
      <TopBar>
        <Heading style={{ marginLeft: "650px", marginTop: "10px" }}>
          Welcome Admin
        </Heading>
        <Logout />
      </TopBar>
      <MainContent>
        <InstructorsContainer>
          <Instructors user={user} />
        </InstructorsContainer>
        <CoursesContainer>
          <Courses user={user} />
        </CoursesContainer>
      </MainContent>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0f52ba;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 100%;
  width: 100%;
`;

const InstructorsContainer = styled.div`
  width: 40%;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(45, 196, 253, 0.35906862745098034) 100%
  ); /* Muted Gold */
  color: #ffffff; /* White */
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CoursesContainer = styled.div`
  width: 60%;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(233, 148, 208, 0.4767156862745098) 100%
  );

  color: #333333;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const TopBar = styled.div`
  width: 100%;
  background: #3d6464a8;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: white; /* White */
  font-size: 40px;
  font-weight: bold;
  margin-top: 8px;
`;
