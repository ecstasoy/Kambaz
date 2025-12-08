import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  questions: [],
  currentQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes] as any;
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz: any) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      }) as any;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== action.payload
      );
    },
    // Questions reducers
    setQuestions: (state, action) => {
        state.questions = action.payload;
    },
    addQuestion: (state, action) => {
        state.questions = [...state.questions, action.payload] as any;
    },
    updateQuestion: (state, action) => {
        state.questions = state.questions.map((question: any) => {
            if (question._id === action.payload._id) {
                return action.payload;
            } else {
                return question;
            }
        }) as any;
    },
    deleteQuestion: (state, action) => {
        state.questions = state.questions.filter(
            (question: any) => question._id !== action.payload
        );
    }
  },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, setQuestions, addQuestion, updateQuestion, deleteQuestion } = quizzesSlice.actions;
export default quizzesSlice.reducer;

