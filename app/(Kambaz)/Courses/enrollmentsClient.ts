import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/enroll`);
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/enroll`);
  return response.data;
};
