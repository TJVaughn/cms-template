import Axios from 'axios'

const getApiData = async () => {
    const res = await Axios.get('/api/site-title')
    return res.data
}

export { getApiData }