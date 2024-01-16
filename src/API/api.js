import axios from "axios";

const baseUrl = "https://api.trello.com/1";
const keyVal = "688828938a0a81fbaff1c76c5dfa1577";
const tokenVal =
  "ATTA8f44402b42b106239bf6db2011236ca301fa1f2e7c2bd2e8a8766b79af386751A34FF02D";

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(
        `${baseUrl}/${endpoint}key=${keyVal}&token=${tokenVal}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for ${endpoint}:`, error);
      throw error;
    }
  },

  post: async (endpoint) => {
    try {
      const response = await axios.post(
        `${baseUrl}/${endpoint}key=${keyVal}&token=${tokenVal}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/${endpoint}key=${keyVal}&token=${tokenVal}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting data for ${endpoint}:`, error);
      throw error;
    }
  },
  put: async (endpoint) => {
    try {
      const response = await axios.put(
        `${baseUrl}/${endpoint}key=${keyVal}&token=${tokenVal}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating data for ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiService;
