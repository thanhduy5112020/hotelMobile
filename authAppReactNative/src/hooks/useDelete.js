import { useState } from "react";
import axios from 'axios';

const iplink = "http://172.27.0.1:3000/";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const link = iplink;

  const deleteData = async (url) => {
    setLoading(true);
    try {
      const res = await axios.delete(link + url);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
};

export default useDelete;
