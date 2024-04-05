import { takeEvery, put, all } from "redux-saga/effects";
import api from "../../../utils/apiService";
import { ENDPOINT } from "../../../config/endpoint";
import { getCurrentQuestion, updateAnswerAction, getPrevQuestion, curentQuestionSuccess, getNextQuestion, updateAnswerSuccess, updateAnsWithNextQues, getInitialQuestion, fetchDataSuccess } from "../../slice/QuestionsSlice";
import { getLocalStorage } from "../../../utils";

async function commonPostData(data){
  try {
    const postApi = api.request(data);
    const fetchResponse = await postApi;
    return fetchResponse;

  } catch (e){
  }
}


function* fetchQuestionResponse(action) {
  try {
    let data = action.payload, url = ENDPOINT.QUESTION.questionApi();
    if(data.nextQuestionKey) {
      url += `?questionKey=${data.nextQuestionKey}`;
    }
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
    let status = false;
    if(response?.data?.status === '200') {
      status = true;
    }
      yield put(curentQuestionSuccess({...response?.data?.data, }));
      if(data.callback) {
        data.callback(response?.data?.data);
      }

  } catch (error) {
    put(curentQuestionSuccess({ message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({ message: "Something went bad!!", status: false })
    }
  }
}

function* fetchInitialQuestion(action) {
  try {
    let url = action.payload;
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
      if(response?.data?.status === '200') {
        yield put(curentQuestionSuccess({...response?.data?.data, status: true}));
      }
      else {
        yield put(curentQuestionSuccess({...response?.data?.data, status: false}));
      }

  } catch (error) {
    put(curentQuestionSuccess({ message: "Something went bad!!", status: false }));
    console.log('error', error);
  }
}

function* updateAnswerResponse(action) {
  try {
    let data = action.payload, method = 'POST', ansUrl = ENDPOINT.QUESTION.answerApi();
    if(data?.updateAnswer) {
      ansUrl = ENDPOINT.QUESTION.updateAnswerApi();
      method = 'PUT'
    }
    
    let dataToSend = {
      method: method,
      url: ansUrl,
      data: JSON.stringify(data.postBody)
    }
    
    const response = yield commonPostData(dataToSend);
      yield put(updateAnswerSuccess(response?.data));
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    put(updateAnswerSuccess({ message: "Something went bad!!", status: false }));
    if(action.payload.callback) {
      action.payload.callback({ message: "Something went bad!!", status: false });
    }
    console.log('error', error);
  }
}

function* fetchPrevQuestionResponse(action) {
  try {
    let data = action.payload, url = ENDPOINT.QUESTION.prevQuesApi();
    url += `?currentQuestionKey=${data.currentQuestionKey}`;
    if(getLocalStorage('answersheetId')) {
      url += `&answersheetId=${getLocalStorage('answersheetId')}`
    }
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
      yield put(fetchDataSuccess());
      if(data.callback) {
        data.callback(response?.data);
      }

  } catch (error) {
    yield put(fetchDataSuccess());
    if(action.payload.callback) {
      action.payload.callback({ message: "Something went bad!! Please try again later", status: false })
    }
    console.log('error', error);
  }
}

function* fetchNextQuestionResponse(action) {
  try {
    let url = ENDPOINT.QUESTION.nextQuesApi();
    if(action.payload) {
      url += `?questionKey=${action.payload.nextQuestionKey}`;
    }
    let dataToSend = {
      method: 'GET',
      url
    }
    const response = yield commonPostData(dataToSend);
    yield put(fetchDataSuccess());
    if(action.payload.callback) {
      action.payload.callback(response?.data);
    }

  } catch (error) {
    yield put(fetchDataSuccess());
    if(action.payload.callback) {
      action.payload.callback({status: false, message: "Something went bad!! Please try again later"});
    }
    console.log('error', error);
  }
}

function* updateAnsWithNextQuestionResponse(action) {
  try {
    let url = ENDPOINT.QUESTION.nextQuesApi(), actionData = action.payload, method = 'POST', ansUrl = ENDPOINT.QUESTION.answerApi();
    if(actionData?.nextQuestionKey) {
      url += `?questionKey=${actionData.nextQuestionKey}`;
    }

    if(actionData?.updateAnswer) {
      ansUrl = ENDPOINT.QUESTION.updateAnswerApi();
      method = 'PUT'
    }
    
    let answerObj = {
      method: method,
      url: ansUrl,
      data: JSON.stringify(actionData.postBody)
    }
    let questObj = {
      method: 'GET',
      url
    }

    const [answerResponse, nextQuestionResponse] = yield all([
      commonPostData(answerObj),
      commonPostData(questObj)
    ])
    let responseData = {
      answerResponse: answerResponse?.data,
      nextQuestionResponse: nextQuestionResponse?.data
    }
    yield put(fetchDataSuccess());
    if(actionData.callback) {
      actionData.callback(responseData);
    }
  } catch (error) {
    yield put(fetchDataSuccess());
    if(action.payload?.callback) {
      action.payload.callback({ message: "Something went bad!! Please try again later", status: false });
    }
    console.log('error', error);
  }
}

export default function* root() {
  yield takeEvery(getCurrentQuestion.type, fetchQuestionResponse);
  yield takeEvery(updateAnswerAction.type, updateAnswerResponse);
  yield takeEvery(getPrevQuestion.type, fetchPrevQuestionResponse);
  yield takeEvery(getNextQuestion.type, fetchNextQuestionResponse);
  yield takeEvery(updateAnsWithNextQues.type, updateAnsWithNextQuestionResponse);
  yield takeEvery(getInitialQuestion.type, fetchInitialQuestion);
}