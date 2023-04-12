import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
      { duration: '1m', target: 10},
      { duration: '2m', target: 10},
      { duration: '1m', target: 0}
  ],
    thresholds: {
      https_req_duration: ['p(100)<200'],
    },
};

export default  () => {
    let response = http.get("http://localhost:9888/api/post/list/All/Post")
    sleep(1);
}