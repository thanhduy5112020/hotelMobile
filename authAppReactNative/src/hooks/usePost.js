import { useState } from "react";
import axios from 'axios';

const iplink = "http://192.168.2.36:3000/";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const link = iplink;

  const postData = async (url, payload) => {
    setLoading(true);
    try {
      const res = await axios.post(link + url, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postData };
};

export default usePost;
