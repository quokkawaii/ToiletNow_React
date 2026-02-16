import { arrowBack } from "../../assets/Images";

export default function ArrowBack() {
  return (
    <a href="javascript:history.back()" className="logo-line">
      <img src={arrowBack} alt="뒤로가기" />
    </a>
  );
}
