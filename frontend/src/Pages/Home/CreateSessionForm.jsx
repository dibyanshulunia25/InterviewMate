import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input'
import SpinnerLoader from '../../Components/Loader/SpinnerLoader';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value
        }))
    }

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the fields");
            return;
        }

        setError("");
        setIsLoading(true);
        try {
            //call AI APIS to generate questions
            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10,
            });

            //Should be array like
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            });

            if (response?.data?.session?._id) {
                navigate(`/interview-prep/${response.data.session._id}`);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                console.log("Something went wrong", error);
            }
        }
        finally { setIsLoading(false); }
    };

    return (
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col gap-4 justify-center'>
            <h3 className='text-lg font-semibold leading-5 capitalize'>Start a New Interview Journey</h3>
            <p className='text-sm font-medium leading-5 capitalize'>fill out the form below to create a new interview session</p>
            <form onSubmit={handleCreateSession} className='flex flex-col gap-2'>
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Role"
                    placeHolder="(e.g., Full Stack Developer, Software Engineer, etc.)"
                    type="text"
                />
                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Experience"
                    placeHolder="(e.g., 2 years, 1 year, etc.)"
                    type="text"
                />
                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics To Focus"
                    placeHolder="(e.g., React, Node.js, etc.)"
                    type="text"
                />
                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeHolder="(e.g., Description)"
                    type="text"
                />

                {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

                <button type="submit" className="btn-primary w-full mt-2" disabled={isLoading}>{isLoading ? <SpinnerLoader /> : "Create Session"}</button>
            </form>
        </div>
    )
}

export default CreateSessionForm