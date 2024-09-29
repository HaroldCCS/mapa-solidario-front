
const is_test = true;
const host = is_test ? 'http://localhost:3001' : 'https://us-central1-blowbarber.cloudfunctions.net/api';
//'http://127.0.0.1:5001/blowbarber/us-central1/api'

const configService = {host}
export default configService
