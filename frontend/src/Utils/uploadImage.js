import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage=async(image)=>{
    const formData=new FormData();
    //Append image to form data
    formData.append("image",image);
    try {
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                "Content-Type":"multipart/form-data", //set haeder for file upload
            }
        });
        return response.data; //return response data
    } catch (error) {
        console.error("Error uploading image:",error);
        throw error; //Rethrow error
    }
}

export default uploadImage;
