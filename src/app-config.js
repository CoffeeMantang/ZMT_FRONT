let backendHost;

const hostname = window && window.location && window.location.hostname;
// JS의 논리곱 단축평가 - 하나라도 null인 경우 false
// 모두 값이 있는 경우 hostname 변수에 window.location.hostname이 들어감.


if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;
//문자열 안에 변수 섞어쓰기 위해 사용