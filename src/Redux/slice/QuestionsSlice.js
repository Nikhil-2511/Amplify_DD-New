import { createSlice } from "@reduxjs/toolkit";
import { apiResponse } from "../../Component/Step1/Data";

const initialState = {
  isLoading: false,
  currentQuestion: {},
  currentQuestionSuccess: {},
  currentQuestionFailure: {},
  updateAnswerResponse: {}
}

export const QuestionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getCurrentQuestion: (state, action) => {
      state.isLoading= true;
    },

    curentQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentQuestionSuccess = action.payload;
      // state.currentQuestionSuccess = apiResponse;
    },

    saveCurentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },

    getPrevQuestion: (state, action) => {
      state.isLoading= true;
    },

    updateAnswerAction: (state, action) => {
      state.isLoading = true;
    },

    updateAnswerSuccess: (state, action) => {
      state.isLoading = false;
      state.updateAnswerResponse = action.payload;
    },

    getNextQuestion: (state, action) => {
      state.isLoading = true;
    },

    nextQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.nextQuestionResposne = action.payload
    },
    updateAnsWithNextQues: (state, action) => {
      state.isLoading = true;
    },
    getInitialQuestion: (state, action) => {
      state.isLoading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.isLoading = false;
    }
  }
})

export const {
  getCurrentQuestion,
  curentQuestionSuccess,
  saveCurentQuestion,
  updateAnswerAction,
  getPrevQuestion,
  getNextQuestion,
  updateAnswerSuccess,
  nextQuestionSuccess,
  updateAnsWithNextQues,
  getInitialQuestion,
  fetchDataSuccess
} = QuestionsSlice.actions;

export default QuestionsSlice.reducer;