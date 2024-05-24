import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import { getUserSchedule } from "../../utils/APIRoutes";
import axios from "axios";

import loaderImage from "../../assets/loader.gif";

const Instructor = ({}) => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      setCurrUser(JSON.parse(userKey).username);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getUserSchedule, {
          params: { currUser },
        });
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [currUser, navigate, schedules]);

  if (loading) {
    return (
      <LoaderContainer>
        <LoaderImage src={loaderImage} alt="Loading..." />
      </LoaderContainer>
    );
  }

  return (
    <WelcomeContainer>
      <TopBar>
        <Heading>Welcome {currUser}</Heading>
        <Logout />
      </TopBar>
      <MainContent>
        <LecturesContainer>
          <SectionHeading>Your Upcoming Lectures</SectionHeading>
          <ScrollableContent>
            {schedules.map((schedule, index) => (
              <LectureCard key={index}>
                <CardHeading>Course:</CardHeading>
                <CourseContent>{schedule.course}</CourseContent>

                <CardHeading>Lecture:</CardHeading>
                <LectureContent>{schedule.lecture}</LectureContent>

                <CardHeading>Date:</CardHeading>
                <DateContent>
                  {new Date(schedule.date).toLocaleDateString()}
                </DateContent>

                <CardHeading>Location:</CardHeading>
                <LocationContent>{schedule.location}</LocationContent>
              </LectureCard>
            ))}
          </ScrollableContent>
        </LecturesContainer>
      </MainContent>
    </WelcomeContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderImage = styled.img`
  width: 80px;
  height: 80px;
`;

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: radial-gradient(
    circle,
    rgba(198, 255, 157, 1) 0%,
    rgba(155, 128, 242, 0.5663515406162465) 100%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBar = styled.div`
  width: 100%;
  background: #525253;
  padding: 25px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 550px;
`;

const LecturesContainer = styled.div`
  width: 100%;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
`;

const LectureCard = styled.div`
  background-color: #f2c5c5;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 40%;
  box-sizing: border-box;
`;

const SectionHeading = styled.h2`
  color: black; /* White */
  font-size: 24px;
  margin-bottom: 15px;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const CardHeading = styled.h3`
  color: #121212;
  font-size: 25px;
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  margin-bottom: 15px;
  font-size: 18px;
  color: #c0c0c0;
`;

const CourseContent = styled(CardContent)`
  color: #616161;
  font-weight: bold;
  font-size: 25px;
`;

const LectureContent = styled(CardContent)`
  color: #616161;
  font-style: italic;
  font-size: 25px;
  font-weight: bold;
`;

const DateContent = styled(CardContent)`
  color: #616161;
  font-weight: bold;
  font-size: 25px;
`;

const LocationContent = styled(CardContent)`
  color: #616161;
  font-size: 16px;
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 10px;
  overflow: hidden;
  width: 100%;
`;

export default Instructor;
