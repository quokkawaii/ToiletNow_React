import ArrowBack from "../common/ArrowBack";
import HomeBtn from "../common/HomeBtn";

export default function Header() {
  // a태그는 다 제거후 라우터로!
  return (
    <div className="d-flex space-between">
      <ArrowBack></ArrowBack>
      <HomeBtn></HomeBtn>
    </div>
  );
}
