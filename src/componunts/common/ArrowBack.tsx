import { useNavigate } from "react-router-dom";
import { arrowBack } from "../../assets/Images";

export default function ArrowBack() {
  const navigator = useNavigate();
  return (
    <button onClick={() => navigator(-1)} className="logo-line">
      <img src={arrowBack} alt="뒤로가기" />
    </button>
  );
}
