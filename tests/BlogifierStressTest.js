import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse:false,
    stages: [
        { duration: '2s', target: 100}, // below normal load
        { duration: '5s', target: 100},
        { duration: '2s', target: 200}, // normal load
        { duration: '5s', target: 200},
        { duration: '2s', target: 300}, // around the breaking point
        { duration: '5s', target: 300},
        { duration: '2s', target: 400}, // beyond the breaking point
        { duration: '5s', target: 400},
        { duration: '10s', target: 0} // scale down. Recovery stage.
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
    },
};

export default () => {
    let response = http.get("http://localhost:9888/api/post/list/All/Post");
    sleep(1);
};