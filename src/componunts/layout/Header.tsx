import { Outlet, useLocation, type Location } from "react-router-dom";
import ArrowBack from "../common/ArrowBack";
import HomeBtn from "../common/HomeBtn";
import HamburgerMenu from "../common/mainHambuger";

export default function Header() {
  const location: Location = useLocation();
  const isMain: boolean = location.pathname == "/";

  return (
    <>
      <header className="p-3 bg-white border-bottom shadow-sm">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* 좌측 영역: 고정된 비율 확보 */}
          <div className="flex-grow-1" style={{ flexBasis: 0 }}>
            {!isMain ? <ArrowBack /> : <HamburgerMenu />}
          </div>

          {/* 중앙 영역: 로고 본연의 크기 유지 */}
          <div className="text-center">
            <HomeBtn />
          </div>

          {/* 우측 영역: 좌측과 정확히 똑같은 너비 확보 */}
          <div className="flex-grow-1" style={{ flexBasis: 0 }}></div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
