import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import moment from 'moment';
import RoleInfoHeader from './components/RoleInfoHeader';
import QuestionCard from '../../Components/Cards/QuestionCard';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import Drawer from '../../Components/Drawer';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import SpinnerLoader from '../../Components/Loader/SpinnerLoader';
import AiResponsePreview from './components/AiResponsePreview';

const Interviewprep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, serIsUpdateLoader] = useState(false);

  //fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  // generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      });
      setExplanation(response.data);
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Error generating concept explanation, Try again later");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // toggle question pin status
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));

      console.log(response.data);

      if (response.data && response.data.data) {

        { response.data.data.isPinned == true ? toast.success("Question pinned successfully") : toast.error("Question un-pinned successfully") }
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error toggling question pin status:", error);
    }
  };

  //add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        topicsToFocus: sessionData?.topicsToFocus,
        experience: sessionData?.experience,
        numberOfQuestions: 10,
      });

      //should be array like [{question: "", answer: ""}, {question: "", answer: ""}, ...]
      const generatedQuestions = aiResponse.data;

      //upload questions to session
      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success("Questions added successfully");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error adding questions to session, Try again later");
      }
    } finally {
      serIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => { };
  }, [])

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

      <div className='container mx-auto p-4 md:px-2'>
        <h2 className='capitalize text-lg font-semibold color-black '>Interview Questions and Answers</h2>

        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: index * 0.1, damping: 15, }}
                    layout //this is the key prop that animates posirion changes
                    layoutId={`question-${data._id || index}`} //helps framer motion to animate the position of the question card
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => {
                          generateConceptExplanation(data?.question);
                        }}
                        isPinned={data?.isPinned}
                        onTogglePin={() => {
                          toggleQuestionPinStatus(data._id);
                        }}
                      />


                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 &&
                        <div className='flex items-center justify-center mt-5'>
                          <button className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors' onClick={uploadMoreQuestions} disabled={isUpdateLoader || isLoading}>
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className='text-lg' />
                            )}{""}
                            Add More Questions
                          </button>
                        </div>
                      }
                    </>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer isOpen={openLearnMoreDrawer} onClose={() => setOpenLearnMoreDrawer(false)} title={!isLoading && explanation?.title}>
            {errorMsg && <p className='flex gap-2 text-sm font-medium text-red-500'><LuCircleAlert className='mt-1' />{errorMsg}</p>}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && <AiResponsePreview content={explanation?.explanation} />}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Interviewprep