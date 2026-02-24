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

# 260217 ~ 260218

- 새로운 훅 (context api, useContext)를 공부하는데 시간을 많이씀

- 특정 값을 전역변수로 빼는 방법, prop drilling이 과해질거 같다고 생각이 들어서 공부했음

# 260219

- 현재 위치 기준 1키로 반경 화장실 정보 가져오기 api 연결

- 구/동 입력시 해당 지역으로 중심 이동 및 주변에 마커 찍기

- 기존의 마커 삭제 확인

# 260220

- 목표

0. 제미나이가 준 코드 분석 및 수정하고 사용해먹는식으로 코딩해보기, 기존에 만들어져 있는 ui랑 함수는 최대한 활용

1. 화장실의 정보를 filter할 컴포넌트 생성하기 ㅇ

2. kakaoMap.tsx와 searchLocation.tsx에 사용된 함수들을 저장한 파일 kakaoMapUtil.ts를 분할 ㅇ

3. toilet / kakaoMap / kakaoMarker 3개로 나누기 ㅇ

4. toilet 에서 받아오는 데이터 구조 분해 할당하기, Toilet 타입으로 받아서 필요한 값만 받아오기 (지금은 tname, tlat, tlon만 사용 = 확장성 있는 코드인지를 확인해보기 위해 일단 이 3개만 넣기 ) ㅇ

5. 근데 결국 totilet로 실시간 정보를 얻어야되서 context화 해야겠는데, useRef로 만들고 setMarker로 화면 렌더하는게 좋아보임 (context는 여러가지가 되면 어지러워서 그냥 mapContext.tsx에 넣어두기) 일단 최대한 만들어두고 피드백 받는게 낫겠다 ㅇ

6. 로딩 구현

7. fillter 구현중 ui가 이상이 있음을 확인, css가 제대로 안넘어 온거 같긴한데 필터 검색 버튼을 삭제하는걸로 => 별점, 기저귀 교환대 등을 눌렀을때 즉시 반영되는 식으로 변경하기

# 260221

- fillter 관련 이벤트 추가와 context 값 추가 해야할듯함

# 260224

- filter 체크하는 부분을 input type="checkbox" name="filter"로 통일해서 만들기