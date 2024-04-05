import React, { useEffect, useState } from 'react';
import Step1 from '../../Component/Step1';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { curentQuestionSuccess, getInitialQuestion, getNextQuestion, getPrevQuestion, saveCurentQuestion, updateAnswerAction, updateAnsWithNextQues } from '../../Redux/slice/QuestionsSlice';
import { globalAlert, updateRevaluation } from '../../Redux/slice/CommonSlice';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { filterCurrencyValue, formatCurrencyNumber, getQueryParamFromUrl } from '../../helper/commonHelper';
import { isAuthenticated, reRouteUser } from '../../Services';
import { useNavigate } from 'react-router-dom';
import CustomStepper from '../../CommonComponent/Stepper';
import { ENDPOINT } from '../../config/endpoint';
import { COMPANY_FOUND, COMPANY_NOT_FOUND, IS_VALID_COMPANY } from '../../constants';
import { GenericButton, OutlineButton } from '../../CommonComponent/CustomButton';
import { trackGA4Event } from '../../utils/GAevents';
import { useQuery } from '../../helper/customHook';

function QuestionScreen() {
  const dispatch = useDispatch();
  const questionStore = useSelector((state) => state.questionStore);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [stepDetails, setStepDetails] = useState([
    {
      "section": "company",
      "label": "Company"
    },
    {
      "section": "financial",
      "label": "Financial"
    },
    {
      "section": "customer",
      "label": "Customer"
    },
    {
      "section": "brand",
      "label": "Brand"
    }
  ]);
  const [updateAnswer, setUpdateAnswer] = useState(false);
  const redirect = useNavigate();
  const commonStore = useSelector((state) => state.commonStore);
  const [currentSection, setCurrentSection] = useState('');
  const query = useQuery();

  useEffect(() => {
    if (isAuthenticated()) {
      if (getLocalStorage(IS_VALID_COMPANY) === COMPANY_FOUND && !commonStore.isRevaluation) {
        reRouteUser(redirect);
      }
    }
    getQuestion();
    return () => dispatch(updateRevaluation(false));
  }, [])

  useEffect(() => {
    if (questionStore.currentQuestionSuccess?.status) {
      updateCurrentData(questionStore.currentQuestionSuccess);
      updateAnswerSheetId(questionStore.currentQuestionSuccess?.submittedAnswer?.answersheetId);
      dispatch(curentQuestionSuccess({}));
    }
    else if (questionStore.currentQuestionSuccess?.data?.message) {
      // alert(questionStore.currentQuestionSuccess?.message);
      dispatch(globalAlert({ isOpen: true, message: questionStore.currentQuestionSuccess?.message }));
    }

  }, [questionStore.currentQuestionSuccess])

  function updateCurrentData(data) {
    dispatch(saveCurentQuestion(data));
    if (data?.submittedAnswer?.answerValue) {
      let answerValue = data.submittedAnswer.answerValue;
      if (data?.questionType === 'currency') {
        answerValue = formatCurrencyNumber(answerValue);
      }
      setAnswer(answerValue);
      setUpdateAnswer(true);
    }
    else {
      setAnswer('');
      setUpdateAnswer(false);
    }
  }

  const handleNextQuesCallback = (res) => {
    if (res.status === '200') {
      updateCurrentData(res?.data);
    }
    else {
      dispatch(globalAlert({ isOpen: true, message: res?.message }));
    }
  }

  function updateAnswerSheetId(answersheetId) {
    if (!getLocalStorage('answersheetId') && answersheetId) {
      setLocalStorage('answersheetId', answersheetId);
    }
  }

  function handleAnswer(ans) {
    setAnswer(ans);
    if(error) setError('');
  }

  function renderQuestionScreen() {
    let currentStep = 1;
    switch (currentStep) {
      case 1:
        return <Step1 answer={answer} error={error} updateAnswer={handleAnswer} />
      default:
        return "";
    }
  }


  function updateAnswerCallback(res) {
    if (res?.status === '200') {
      if (res?.data?.nextQuestionKey !== 'END') {
        let dataToSend = {
          nextQuestionKey: res?.data?.nextQuestionKey,
          callback: handleNextQuesCallback
        }
        dispatch(getNextQuestion(dataToSend));
        updateAnswerSheetId(res?.data?.answersheetId)
      }
      else {
        redirectUser();
      }
    }
    else {
      // dispatch(globalAlert({isOpen: true, message: res?.message}));
      if (res?.data?.message) {
        setError(res.data.message);
      }
    }
  }

  function getQuestion() {
    let url = ENDPOINT.QUESTION.initalQuesApi(), queryString = query.get('questionnaireType');
    url += queryString ? `?questionnaireType=${queryString}` : '';
    dispatch(getInitialQuestion(url));
  }

  function getValutionType() {
    let queryParam = query.get('questionnaireType'), queryString = 'valuation';
    if (queryParam) {
      queryString = queryParam;
    }
    return queryString;
  }

  function handlePrevious() {
    let dataToSend = {
      currentQuestionKey: questionStore?.currentQuestion?.questionKey,
      callback: handlePreviousCb
    };
    dispatch(getPrevQuestion(dataToSend));
  }

  function handlePreviousCb(res) {
    if (res?.status === '200') {
      updateCurrentData(res?.data);
    }
    else {
      dispatch(globalAlert({ isOpen: true, message: res?.message }));
    }
  }

  function handleNext() {
    setError(false);
    if (!getAnswerData()) {
      setError("Please fill this in");
      return;
    }

    let answerData = {
      postBody: {
        ...getAnswerData(),
        answersheetId: getLocalStorage('answersheetId')
      },
      updateAnswer
    };
    if(questionStore?.currentQuestion?.questionSection !== currentSection) {
      setCurrentSection(questionStore?.currentQuestion?.questionSection);
      trackGA4Event('seller_onboarding_section', {event_category: 'Questionnaire', action: 'Next question click', section_name: questionStore?.currentQuestion?.questionSection});
    }
    if (questionStore?.currentQuestion?.nextQuestionKey && questionStore?.currentQuestion?.nextQuestionKey !== 'END') {
      answerData.callback = handleAnsWithQuesCb;
      answerData.nextQuestionKey = questionStore?.currentQuestion?.nextQuestionKey
      dispatch(updateAnsWithNextQues(answerData));
    }
    else {
      answerData.callback = updateAnswerCallback;
      dispatch(updateAnswerAction(answerData));
    }
  }

  function handleAnsWithQuesCb(res) {
    let { answerResponse, nextQuestionResponse } = res;
    if (answerResponse?.status === '200') {
      let answerData = answerResponse?.data, nextQuestion = nextQuestionResponse?.data;
      if (answerData?.answerValue) {
        setUpdateAnswer(true);
      }
      if (answerData?.nextQuestionKey === questionStore.currentQuestion?.nextQuestionKey && nextQuestionResponse?.status === '200') {
        updateCurrentData(nextQuestion);
      }
      else {
        let dataToSend = {
          nextQuestionKey: answerResponse?.data?.nextQuestionKey,
          callback: handleNextQuesCallback
        }
        dispatch(getNextQuestion(dataToSend));
      }
      updateAnswerSheetId(answerResponse?.data?.answersheetId);
    }
    else if (answerResponse?.data?.message) {
      setError(answerResponse.data.message);
      // dispatch(globalAlert({isOpen: true, message: res?.message}));
    }
  }

  function getAnswerData() {
    if (!answer) {
      // dispatch(globalAlert({isOpen: true, message: 'Please update your answer'}));
      return false;
    }
    let answerValue = answer;
    if (questionStore.currentQuestion?.questionType === 'currency') {
      answerValue = filterCurrencyValue(answer);
    }

    return { questionKey: questionStore.currentQuestion?.questionKey, answerValue, questionnaireType: getValutionType() };
  }

  function redirectUser() {
    if (isAuthenticated()) {
      if (getLocalStorage(IS_VALID_COMPANY) === COMPANY_NOT_FOUND) {
        setLocalStorage(IS_VALID_COMPANY, COMPANY_FOUND);
        redirect('/valuation');
      }
      else reRouteUser(redirect);
    }
    else {
      redirect('/signup')
    }
  }

  function getActiveStep() {
    let currentStep = 0, index = -1;
    index = stepDetails.findIndex((stepItem) => {
      return stepItem.section === questionStore.currentQuestion.questionSection
    })
    if (questionStore?.currentQuestion?.nextQuestionKey === 'END') {
      currentStep = stepDetails.length;
    }
    else if (index > -1) {
      currentStep = index;
    }
    return currentStep;
  }

  return (
    <div className="question-screen-wrapper">
      <div className="container">
        <div className="question-screen-content">
          <div className="left-container">
            <div className="primary-theme margin-b20 padding-y20 rounded-8">
              <CustomStepper steps={stepDetails} activeStep={getActiveStep()} />
            </div>
            {renderQuestionScreen()}
            <div className="action-button-container">
              <div>
                {
                  questionStore?.currentQuestion?.previousQuestionKey !== 'START' &&
                  <OutlineButton className="capitalize w-100px" variant="outlined" size="medium" onClick={handlePrevious}>Previous</OutlineButton>
                }
              </div>
              <GenericButton className="primary capitalize w-100px" variant="contained" size="medium" onClick={handleNext}>
                {questionStore?.currentQuestion?.nextQuestionKey === 'END' ? 'Submit' : 'Next'}
              </GenericButton>
            </div>
          </div>
          {
            // !isMobileView() &&
            <div className="graident-container grad-1">
              <div>
                <div className="gradient-icon text-24">💡</div>
                <div className="gradient-content font-500 padding-l5">
                  {questionStore?.currentQuestion?.questionHint || ''}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      {/* <Loader isOpen={questionStore.isLoading} /> */}
    </div>
  )
}

export default QuestionScreen;