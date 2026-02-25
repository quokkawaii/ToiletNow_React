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

# 260224

- 필터링 : input type="checkbox" name="filter"로 통일해서 만들기
  ㄴ 어떤 필터 선택했는지.

- 마커 이미지 변경 o

# 260225 ~ 260226

- 로딩을 만들어 보기 => 지금 있는 로딩 안됨

- 필터 버그 도저히 모르겠어서 그냥 setTimeout으로 1초간 로딩 주는게 나을듯 => 이렇게 했는데 마커가 이상하게 찍혀서 context를 전체 수정 해야할듯 + kakaoMarkerUtil 파일도 수정

- 모든 context 상태값을 useRef로 만들고 로딩에 useState를 줘서 렌더링 관리를 하는게 나을거같음 => 코드 다시 짜야됨

- home 컴포넌트에 Loading을 주고 props로 넘길 생각도 해야겠다

## 정리

```tsx
// 1
const [markers, setMakers] = useState(); // 이걸 useRef로
const markers = React.RefObject<kakao.maps.Marker[]>([]); // 이거맞나
// 일단 마커 찍히는 버그를 고친후 아래 일정 진행하기
// 현재 마커가 단일 필터를 여러번 눌렀을때는 문제가 없는데
// 여러개의 마커를 동시에 빠르게 누르면 클릭 동작이 십히는 경우가 있음
// 필터는 정상작동되어 눌린 표시가 되지만 실제 값은 false가 되버림

// 2
const [isLoading, setIsLoading] = useState(false);
// 해당 값을 kakaomap,  filter,  search에 넣어줘야됨
// filter를 눌러도 kakaoMap 화면이 로딩되어야함
// 마찬가지로 search를 했을때도  filter, kakaoMap에 로딩

// 3
// 현재 위치의 마커 객체와 search 여부를 체크하는 변수를 만들어야할듯
// filter 조회시 사라짐, 근데 검색시에는 현재 위치가 필요 없음
// useState() vs useRef() 둘중 고민해야할듯

const isCurr: boolean = true; // 초기 맵 or 내 위치 버튼 클릭 => true
// 만약 search시
isCurr = !isCurr;

const currMarker = 마커객체;
// 현재 위치의 마커 객체는 추후 추가될 내 위치를 찍었을때 or 초기 맵에서만 찍기
// 그냥 kakaoMap이 로딩되면 이 객체의 값을 업데이트 해주면됨
// useEffect의 실행조건 => 초기에 로딩 + 내 위치 클릭

// 4
// marker 유틸 createMaker 이거 좀 어떻게 해야할듯
// 단일 책임 원칙을 어기고 있음, 그리고 가독성이 안좋음
// 다른 애들도 좀 고쳐야겠다 ex)

// [화장실 마커 생성]
// 새로운 마커들을 담을 임시 배열
const tempMarkers: kakao.maps.Marker[] = [];
toiletRef.current.forEach((toilet: any) => {
  const marker = createMarker(
    map,
    toilet.tlat,
    toilet.tlot,
    toilet.tname,
  );
  tempMarkers.push(marker);
});
// 단일 책임 원칙을 벗어난거같음
// 마커 객체를 생성 => 마커 객체를 맵에 찍기 순으로 하면 될듯
// createMarker에 marker.setMap(map); 주석되어 있긴하네
// + 내 위치와 같이 차별성이 있는 애들은??
if(title == "내 위치") img = "내 위치 이미지";

// 5
// context로 가져오는 전역 변수들의 전용 함수를 만드는 방법을 모르겠네 => 생각해보니까 그냥 만들어서 util 파일에 넣으면 되네
// 이거때문에 중복코드를 못잡고 있음
// ex
if (markers && markers.length > 0) {
  // markers에 담긴 값이 있다면 해당 마커를 지우기
  markers.forEach((marker) => marker.setMap(null));
}

const deleteMarkers = (markers: kakao.maps.Maker[]) => {
  markers.forEach((marker) => marker.setMap(null));
};

deleteMarkers(markers);

// 6
// 지도 중심 이동
// lat, lng는 검색된 지역의 좌표임
const centerLatLng = new kakao.maps.LatLng(lat, lng);
// 지도를 새로 그리지않고 중심 지점만 이동하는 방법
map.setCenter(centerLatLng);

const setMapCenter(map,lat,lng) => {
  map.setCenter(new kakao.maps.LatLng(lat,lng));
}

```

# 각각의 기능들 플로우 차트 생각해보기

- 맵 초기

0. 내 위치

1. 내 위치 받아서 해당 정보로 맵을 생성 (중심점)

2. 마커 객체 생성 & 마커 찍기

3. tempMarkers에 마커 객체 push (추후 삭제 용도)

4. 주변 위치

5. 내 위치를 기준으로 반경 1키로내의 정보를 받아옴

6. 받아온 정보가 있다면 모든 배열을 순회해서 마커 객체 생성 & 마커 찍기

7. tempMarkers에 마커 객체들 push

8. serMarkers(tempMarkers)로 마커 정보 수정

- 검색시 맵

1. 검색어 입력 후 enter시 handleSearch 이벤트 발생

2. 검색어 중심으로 위도 경도 뽑기

3. 기존 마커가 있으면 마커 초기화 해주기

4. 중심 지역 이동시키기

5. 주변 마커 찍어주기

- 검색시 맵 수정 사항

1. 마커 객체 담는 배열 이름을 kakaoMap이랑 맞췄음 newMakers => tempMarkers

2. 검색어 기준 위치는 맵에 찍지 않는걸로 바꿨음

3. 주변 마커를 찍는 코드 수정 => createMaker를 사용하게

- 필터 입력시 맵

1. 필터 클릭시 onToggle 이벤트 실행

2. 클릭시 누른 필터를 기준으로 textContent를 뽑음

3. toggleSwitch 실행 => 필터의 내부 값을 수정 (f -> t or t -> f)

4. updateMarkers() 실행

- 기존 마커 지우기 marker.setMap(null)

- toiletState의 값을 통과한 마커 객체들을 filterToilet에 담기

- 해당 마커들을 맵에 찍기

- 필터 입력시 맵 오류

1. 필터시 내 위치가 사라지네, 검색했을때 내 위치 안보이는데 => 추후 내 위치 키는 기능 넣을때 그 때 수정하면 될거같음

2. setMarkers() 와 createMaker 이 두개가 겹친다는걸 알았음 createMarker에 마커 찍는 기능을 빼도 될듯함

3. 막누르면 업데이트 되기전에 눌러져서 버그 생김 (로딩 추가하면 될듯?)
