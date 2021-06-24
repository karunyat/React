import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-burger-72a67-default-rtdb.firebaseio.com/'
});
export default instance;