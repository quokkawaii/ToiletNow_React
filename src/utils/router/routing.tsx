// .ts 파일에서 라우팅 사용이 안되는것도 있고
// 자주쓰는 라우팅 주소들을 모아두는게 좋을거같음

import { useNavigate } from "react-router-dom";

export const WELCOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const CHANGE_PASSWORD_PATH = "/changePassword";
export const SIGNUP_PATH = "/signup";
export const RESET_PASSWORD_PATH = "/resetPassword";
export const ERROR404_PATH = "/error404";

export const moveToPath = (path: string) => {
  const navigator = useNavigate();
  navigator(path);
};
