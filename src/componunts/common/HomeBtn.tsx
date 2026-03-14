import { useNavigate } from "react-router-dom";
import { logo2 } from "../../assets/Images";

export default function HomeBtn() {
  const navigate = useNavigate();
  return (
    <button className="btn p-0 border-0" onClick={() => navigate("/")}>
      <img src={logo2} alt="home" style={{ height: "30px" }} />
    </button>
  );
}
