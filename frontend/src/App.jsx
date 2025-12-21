import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/Interviewprep'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path='/' element={<LandingPage />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
      </Routes>
    </Router>

    <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize:"13px",
        },
      }}
    />
    </>
  )
}

export default App