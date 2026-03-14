import { useNavigate } from "react-router-dom";
import { arrowBack } from "../../assets/Images";

export default function ArrowBack() {
  const navigate = useNavigate();
  return (
    <button className="btn p-0 border-0" onClick={() => navigate(-1)}>
      <img src={arrowBack} alt="뒤로가기" style={{ width: "24px" }} />
    </button>
  );
}
