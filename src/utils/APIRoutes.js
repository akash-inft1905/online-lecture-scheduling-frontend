// export const host =
//   "https://online-lecture-scheduling-module-backend-muj9.onrender.com";
// export const host = "https://online-lecture-scheduling-module.vercel.app";
export const host = "http://localhost:4000";

// authentication
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const logoutRoute = `${host}/api/auth/logout`;

// users
export const allInstructors = `${host}/api/auth/allinstructors`;
export const getUserSchedule = `${host}/api/auth/getuserschedule`;
export const checkAvailable = `${host}/api/auth/checkInstructorAvailability`;

// course
export const addCourse = `${host}/api/auth/addcourse`;
export const getCourse = `${host}/api/auth/getcourse`;
export const getCourseName = `${host}/api/auth/getcoursename`;
export const getSchedule = `${host}/api/auth/getschedule`;
export const addSchedule = `${host}/api/auth/addschedule`;
