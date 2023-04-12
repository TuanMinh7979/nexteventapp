import axios from "axios";
export const postAPI = async (url, post, token) => {
  if (token) {
    return await axios.post(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
  } else {
    return await axios.post(`/api/${url}`, post);
  }
};
export const getAPI = async (url, token) => {
  if (token) {
    return await axios.get(`/api/${url}`, {
      headers: { Authorization: token },
    });
  } else {
    return await axios.get(`/api/${url}`);
  }
};

export const patchAPI = async (url, post, token) => {
  if (token) {
    return await axios.patch(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
  } else {
    return await axios.patch(`/api/${url}`, post);
  }


};
export const deleteAPI = async (url, token) => {
  if (token) {
    return await axios.delete(`/api/${url}`, {
      headers: { Authorization: token },
    });
  } else {
    return await axios.delete(`/api/${url}`);
  }


};
