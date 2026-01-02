import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { CARD_BG } from '../../Utils/data'
import DashboardLayout from '../../Components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import SummaryCard from '../../Components/Cards/SummaryCard'
import moment from 'moment'
import Modal from '../../Components/Modal'
import CreateSessionForm from './CreateSessionForm'
import DeleteAlertContent from '../../Components/DeleteAlertContent'
import toast from 'react-hot-toast'


const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Error deleting session");
      console.error("Error deleting session:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, [])

  return (
    <DashboardLayout>
      <div className='container p-4 md:px-2'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("DD MMM YYYY") : ""}
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data: data })}
            />
          ))}
        </div>
        <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#E99A4B] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20' onClick={() => setOpenCreateModal(true)}><LuPlus className='text-2xl text-white' />Add New</button>
      </div>

      <Modal isOpen={openCreateModal} onClose={() => {setOpenCreateModal(false)}} hideheader>
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
          
      <Modal isOpen={openDeleteAlert?.open} onClose={() => {setOpenDeleteAlert({ open: false, data: null })}} title="Delete Alert">
        <div className='w-[30vw]'>
          <DeleteAlertContent content="Are you sure you want to delete this session?" onDelete={()=> deleteSession(openDeleteAlert.data)} />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard