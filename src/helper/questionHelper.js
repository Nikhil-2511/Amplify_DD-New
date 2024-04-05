import store from "../Redux"

export const saveCurrentQuestion = () => {
  let nextQuestion = store.getState().QuestionStore?.nextQuestion;
  store.dispatch(saveCurentQuestion(nextQuestion));
}