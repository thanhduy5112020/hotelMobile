import { useEffect, useState } from "react"
import axios from 'axios';

const iplink = "http://172.168.232.68:3000/"

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const link = iplink + url
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(link)
                setData(res.data)
            } catch (err) {
                setError(err)
            }
            setLoading(false);
        }
        fetchData()
    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    }

    return {data, loading, error, reFetch}
}

export default useFetch;