import { useNavigate } from "react-router-dom";
import { logo2 } from "../../assets/Images";

export default function HomeBtn() {
  const navigator = useNavigate();
  return (
    <div>
      <h1 className="logo-line">
        <button id="homeBtn" onClick={() => navigator("/")}>
          <img src={logo2} alt="home" />
        </button>
      </h1>
      <div className="logo-line"></div>
    </div>
  );
}
