import axios from 'axios';

const getProviderData = async () => {
    const response = await axios.get('http://localhost:8081/provider');
    return response.data;
};

export { getProviderData };