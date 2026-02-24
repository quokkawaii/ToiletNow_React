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

# 260223

- filter 클릭시 별점만 온오프 되는 버그 발생 =>
  MapFillterTag의 id값과 htmlFor 이게 btncheck3으로 고정되어 있었음
  map() 함수를 통해 index값을 넘겨주어 해결

```typescript
// before
id="btncheck3"
hrmlFor="btncheck3"

// after
id={"btncheck" + idx}
htmlFor={"btncheck" + idx}
```

- 화장실 정보 타입 추가

```typeScript
export interface Toilet {
tid: number;           // 화장실 ID (예: 30650)
tname: string;         // 화장실 명칭 (예: "흥산에너지주유소")
tregion: string;       // 동 단위 지역 (예: "신곡동")
tregion2: string;      // 구/시 단위 지역 (예: "의정부시")
taddr: string;         // 상세 주소 (예: "경기 의정부시 금신로 91")
tlat: number;          // 위도 (예: 37.728992904149)
tlot: number;          // 경도 (예: 127.063671245779)
ttime: string;         // 이용 시간 (예: "상시")
toptime: string | null; // 개방 시간 상세 (null 값이 들어올 수 있음)
tdiaper: "Y" | "N";    // 기저귀 교환대 유무 (Y/N 리터럴 타입)
tdisabled: "Y" | "N";  // 장애인용 화장실 유무
talarm: "Y" | "N";     // 비상벨 유무
tcctv: "Y" | "N";      // CCTV 유무
distance: number;      // 거리 (예: 0.055165...)
}

```

- 추후에 별점 추가하기, 별점 정보가 없네

- 오늘 한거

1. MapFilterTag.tsx 파일에 필터 기능 넣었음 (수정 필요)

2. MapContext.tsx에 switches 추가했는데 변수 이름 맘에 안들어서 변경 예정

- 해야 되는거

1. 모듈화, 마커 관련이랑 상태 초기화하는것들 좀 유틸로 만들어놔야할듯함, 코드가 비슷한데 조금씩 다른게 불편해서 생각좀 해봐야할듯 -> 동의

2. 현재 위치를 관련해서 신경써줘야하는게 있네, 동으로 이동시에는 현재 위치를 삭제하는걸로?

3. setMarkers를 useRef로 만들고, Loading을 구현해보기 (로딩 화면이 따로 있어야함)

4. 필터 초기화 및 검색 이동시 검색 기준점 삭제 (2번과 비슷한 내용)

5. context 파일도 슬슬 어지러워 지고 있음, 전역 변수가 많을 수 밖에 없긴한데 좋은 방법 생각해보기

6. 각각의 기능들 플로우 차트 생각해보기

- 맵 초기

- 검색시 맵

- 필터 입력시 맵
  
  
# 260224

- 필터링 : input type="checkbox" name="filter"로 통일해서 만들기
    ㄴ 어떤 필터 선택했는지.

- 마커 이미지 변경 o
