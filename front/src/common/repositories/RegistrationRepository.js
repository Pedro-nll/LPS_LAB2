import axios from "axios";
import { API_URL } from "../helpers/api";

const BASE_URL = API_URL + "/registration";
const RegistrationRepository = {

    getAllRegistration: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getAllRegistrationByStudentId: async (id) => {
    try {
      const response = await axios.get(BASE_URL + `/student/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching registration by user id:", error);
      throw error;
    }
  },

  post: async (data) => {
    try {
      const response = await axios.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  delete: async (data) => {
    try {
        console.log(JSON.stringify(data))
        const response = await axios.delete(BASE_URL +"/subjects", JSON.stringify(data));

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default RegistrationRepository;
 