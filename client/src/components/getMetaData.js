import Axios from 'axios'

const getMetaData = async () => {
    const res = await Axios.get('/api/user')
    return res.data
}

export default getMetaData