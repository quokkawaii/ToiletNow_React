// gmail 확인 양식
export const gmailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// 이메일 양식
export const emailRegex: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 비번 양식
// 대문자, 소문자, 특문 하나 이상
// 길이 8이상
// 특문은 @, $, !, %, *, ?, &만 가능, sql 인젝션과 xss 취약점 방지!
export const passwordRegex: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 이름 양식
// 한글(완성형), 영문(대소문자), 공백을 포함하여 2~20자
export const nameRegex: RegExp = /^[가-힣a-zA-Z\s]{2,20}$/;

export const regexTest = (text: string, regex: RegExp) => {
  return regex.test(text);
};
