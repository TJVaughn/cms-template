import Axios from 'axios'

const getApiData = async () => {
    const res = await Axios.get('/api/hello')
    return res.data
}

export { getApiData }