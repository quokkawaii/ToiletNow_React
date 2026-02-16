# 부트스트랩 의존성

1. css 테마

```bash
npm install bootstrap react-bootstrap
```

2. 아이콘

```bash
npm install bootstrap-icons
```

3. 한번에 둘다 추가

```bash
npm install bootstrap react-bootstrap bootstrap-icons
```

4. 의존성 설치후 main.tsx 또는 App.tsx에 import

```tsx
import "bootstrap/dist/css/bootstrap.min.css";
```

- 부트스트랩 스크립트 관련은 나중에

# 순서

## 메인 페이지부터 만들기 (db없이)

- 지도 불러오기 (html에 넣어도 되나? => .env파일로 키 보호?)

- 사용자 위치 찍기, 처음 로딩시에도

- 마커 찍기 => (db없어서 주변 1km가 아닌 사용자 위치 기준의 동을 뽑기?)

- 검색 기능 => 검색한 동을 찍기

- 필터 검색 (필터의 텍스트를 아이콘으로 대체)

## 라우팅

- 일단 페이지 별로 pages에 컴포넌트 생성

- 각각의 page에 라우터 넣어주기 => 페이지 이동

- 각각의 라우터에 중첩 라우터 설정해주기 => 헤더같은거 넣어주기, 메인 페이지에는 헤더가 아닌 common에 <HomeBtn>만 넣기

### 카카오 맵 관련 타입 추가

```ts
const setMarker = (map: kakao.maps.Map, lat: number, lon: number) => {
  let markerPosition = new kakao.maps.LatLng(lat, lon);

  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
};
```

#### 인자의 map 타입인 kakao.maps.Map 타입 추가하기

1. 카카오 타입 의존성 추가 (타입 패키지)

```bash
npm install -D kakao.maps.d.ts
```

2. 컴파일러에 타입에 해당 값을 추가

```json
// tsconfig.app.json
 "compilerOptions": {
  "types": ["vite/client", "kakao.maps.d.ts"] // "kakao.maps.d.ts"를 추가
 }

```

- 주의 할점, tsconfig.json이 원래 한개였는데 node랑 app이랑 나눠진듯함

- node는 node환경에서 실행되는 설정 파일, app은 브라우저에서 실행되는 코드 설정

- 이러면 kakao.maps.Map 타입이랑 그외 다양한거 사용 가능한듯

- 사용이유 : 가져온 객체의 타입을 정해줘야 되는데 any타입이면 타입 안정성이 떨어져서

---

## 무슨 페이지가 있을까 (라우터로 나눌거 기준)

```js

const pages = [
  Home : "메인 페이지",
  Login : "로그인 화면",
  ForgotPassword : "비밀번호 찾기 화면",
  ChangePassword : "비밀번호 변경 화면",
  ResetPassWord : "비밀번호 초기화 화면",
  MyReview : "사용자가 입력한 리뷰 화면",
];
```

# 260216

- 카카오 맵 가져오기

- 현재 위치 기준으로 맵 이동

- 주변에 마커 몇개 찍어보기 잘나옴 (윈도우 기준으로)
