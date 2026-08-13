import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
};

export const updateQuestion = async (question: any) => {
    const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};







