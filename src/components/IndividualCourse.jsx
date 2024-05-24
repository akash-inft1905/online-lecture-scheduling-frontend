import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSchedule,
  allInstructors,
  getCourseName,
  addSchedule,
  checkAvailable,
} from "../utils/APIRoutes";
import axios from "axios";

const ceruleanBlue = "#007ba7";
const ivoryCream = "#fffdd0";
const darkGray = "#333333";
const sageGreen = "#8f9779";
const dustyRose = "#d2b48c";
const velvetNavy = "#001f3f";
const white = "#ffffff";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 100vh;
  background: radial-gradient(
    circle,
    rgba(198, 157, 255, 1) 0%,
    rgba(128, 242, 210, 0.5663515406162465) 100%
  );
`;

const TopBar = styled.div`
  width: 100%;
  background: ${velvetNavy};
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: ${white};
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`;

const CourseName = styled.h1`
  margin-bottom: 20px;
  color: ${ivoryCream};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  background: radial-gradient(
    circle,
    rgba(198, 157, 255, 1) 0%,
    rgba(128, 242, 210, 0.5663515406162465) 100%
  );

  width: 100%;
  padding: 20px;
`;

const CardList = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

const NoScheduleMessage = styled.p`
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: ${white};
`;

const Card = styled.div`
  background-color: #ffdede;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  width: calc(45% - 20px);
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: scale(1.06);
  }

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
  }

  .card-content {
    padding: 10px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }

  p {
    margin-bottom: 5px;
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 55%;
  background-color: #258fdb6b;
  color: #131324;
  border: 2px solid black;
  border-radius: 15px;
  text-align: center;
  padding: 20px;

  input,
  select {
    margin: 10px 0;
    padding: 10px;
    width: calc(100% - 100px);
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid black;
    background-color: rgb(247 228 228);
  }

  button {
    margin-top: 20px;
    padding: 10px;
    background-color: rgb(1 1 1);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 30px;
    margin-top: 30px;

    &:hover {
      background-color: #2a0080;
    }
  }
`;

const IndividualCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [dropDropUser, setDropUser] = useState(undefined);
  const [id, setId] = useState(null);
  const [courseName, setCourseName] = useState("Dummy Course");
  const [instructorData, setInstructorData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule, setSchedule] = useState([]);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      const adminUserData = JSON.parse(adminKey);
      setId(adminUserData._id);
    } else if (userKey) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate, adminKey, userKey]);
  const updateInstructorData = (instructor) => {
    const existingInstructor = instructorData.find(
      (i) => i === instructor.username
    );
    if (!existingInstructor) {
      setInstructorData((prevData) => [...prevData, instructor.username]);
    }
  };

  const getCourseNameById = async (courseId) => {
    try {
      const response = await axios.get(`${getCourseName}/${courseId}`);
      return response.data.courseName;
    } catch (error) {
      console.error("Error fetching course name:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        if (courseId) {
          setCourseName(await getCourseNameById(courseId));
        }
      } catch (error) {
        console.error("Error fetching course name:", error);
      }
    };
    fetchCourseName();
  }, [courseId]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (id) {
          const response = await axios.get(`${allInstructors}/${id}`);
          const fetchedInstructors = response.data;
          fetchedInstructors.forEach(updateInstructorData);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [id]);

  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    subject: "",
    lecture: "",
    location: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInstructorSelection = (e) => {
    const selectedInstructor = e.target.value;
    setDropUser(selectedInstructor);
    setSelectedInstructor(selectedInstructor);
  };

  useEffect(() => {}, [setDropUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const course = courseName;
    const scheduleData = {
      course: course,
      lecture: lectureData.lecture,
      date: lectureData.date,
      instructor: dropDropUser,
      location: lectureData.location,
    };
    try {
      const availabilityCheckResponse = await axios.post(checkAvailable, {
        username: dropDropUser,
        date: lectureData.date,
      });

      if (availabilityCheckResponse.status === 200) {
        const response = await axios.post(addSchedule, scheduleData);
        console.log("Schedule added successfully:", response.data);
      } else {
        console.error("Instructor is busy on this date.");
      }
    } catch (error) {
      console.error("Error checking instructor availability:", error);
    }

    setLectureData({
      instructor: "",
      date: "",
      subject: "",
      lecture: "",
      location: "",
    });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getSchedule, {
          params: { courseName },
        });
        setSchedule(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      }
    };
    fetchSchedules();
  }, [courseName, dropDropUser, handleSubmit]);

  return (
    <Container>
      <TopBar>
        <Heading>Welcome admin</Heading>

        <CourseName>{courseName}</CourseName>
        <Logout />
      </TopBar>
      <ContentWrapper>
        {schedule.length === 0 ? (
          <NoScheduleMessage>No lectures scheduled.</NoScheduleMessage>
        ) : (
          <CardList>
            {schedule.map((scheduleItem, index) => (
              <Card key={index}>
                <div className="card-content">
                  <h2>Lecture: {scheduleItem.lecture}</h2>
                  <p>Instructor: {scheduleItem.instructor}</p>
                  <p>
                    Date: {new Date(scheduleItem.date).toLocaleDateString()}
                  </p>
                  <p>Location: {scheduleItem.location}</p>
                </div>
              </Card>
            ))}
          </CardList>
        )}

        <Form onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "30px", marginTop: "20px" }}>
            Schedule a Lecture
          </h2>
          <select
            name="instructor"
            value={selectedInstructor}
            onChange={handleInstructorSelection}
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructorData.map((instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={lectureData.date}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={lectureData.subject}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option>{courseName}</option>
          </select>
          <input
            type="text"
            name="lecture"
            placeholder="Lecture"
            value={lectureData.lecture}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={lectureData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Schedule Lecture</button>
        </Form>
      </ContentWrapper>
    </Container>
  );
};

// Export the IndividualCourse component
export default IndividualCourse;
