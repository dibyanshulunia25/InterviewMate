export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Signup
        LOGIN: "/api/auth/login", //Authenticate user and return JWT token
        GET_PROFILE: "/api/auth/profile", //Get logged-in user profile
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", //Upload image
    },

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", //Generate interview questions
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", //Generate concept explanation   
    },

    SESSION: {
        CREATE: "/api/sessions/create", //Create session
        GET_ALL: "/api/sessions/my-sessions", //Get session
        GET_ONE: (id) => `/api/sessions/${id}`, //Get session by id
        DELETE: (id) => `/api/sessions/${id}`, //Delete session by id
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add", //Add question to session
        PIN: (id) => `/api/questions/${id}/pin`, //Pin/unpin question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`, //Update/add note
    }
};
