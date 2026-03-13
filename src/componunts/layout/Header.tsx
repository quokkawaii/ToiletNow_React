import { Outlet, useLocation, type Location } from "react-router-dom";
import ArrowBack from "../common/ArrowBack";
import HomeBtn from "../common/HomeBtn";

export default function Header() {
  const location: Location = useLocation();
  const isMain: boolean = location.pathname == "/";

  return (
    <div>
      <div className="d-flex space-between">
        {!isMain && <ArrowBack></ArrowBack>}
        <HomeBtn></HomeBtn>
      </div>
      <Outlet />
    </div>
  );
}
