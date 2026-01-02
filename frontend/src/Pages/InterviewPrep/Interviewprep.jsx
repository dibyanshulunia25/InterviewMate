import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import moment from 'moment';
import RoleInfoHeader from './components/RoleInfoHeader';

const Interviewprep = () => {
  const {sessionId} = useParams();

  const [sessionData,setSessionData] = useState(null);
  const [errorMsg,setErrorMsg] = useState("");

  const [openLearnMoreDrawer,setOpenLearnMoreDrawer] = useState(false);
  const [explanation,setExplanation] = useState(null);

  const [isLoading,setIsLoading] = useState(false);
  const [isUpdateLoader,serIsUpdateLoader] = useState(false);

  //fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if(response.data && response.data.session){
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  // generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        sessionId,
        topic: sessionData?.topicsToFocus
      });
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Error generating concept explanation:", error);
    }
  };

  // toggle question pin status
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN, {
        sessionId,
        questionId
      });
      fetchSessionDetailsById();
    } catch (error) {
      console.error("Error toggling question pin status:", error);
    }
  };

  //add more questions to a session
  const addMoreQuestionsToSession = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: sessionData?.questions
      });
      fetchSessionDetailsById();
    } catch (error) {
      console.error("Error adding more questions to session:", error);
    }
  };

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }

    return ()=>{};
  },[])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).format("DD MMM YYYY") : ""}
      />
      
      
    </DashboardLayout>
  )
}

export default Interviewprep