// 객체와 url를 입력 받는다

// fetch('https://api.example.com/signup', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ id: 'user123', pw: '1234' })
// });

// 테스트 결과 : 그냥 JSON.stringify(items) 하면됨

const ENDPOINT: string = "http://127.0.0.1:8081/api";

// get 요청
export const requestGet = async (url: string) => {
  const response = await fetch(ENDPOINT + url);
  const json = await requestData(response);
  return json;
};

// post 요청
export const requestPost = async (items: object, url: string) => {
  const payload = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  };

  const response = await fetch(ENDPOINT + url, payload);

  const json = await requestData(response);
  return json;
};

// response가 200, 201 => json 리턴, 404, 500 => 에러페이지로 이동
const requestData = async (response: Response) => {
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return null;
  }
};
