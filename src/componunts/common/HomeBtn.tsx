import { logo2 } from "../../assets/Images";

export default function HomeBtn() {
  return (
    <div>
      <h1 className="logo-line">
        <a id="homeBtn" href="/index.html">
          <img src={logo2} alt="home" />
        </a>
      </h1>
      <div className="logo-line"></div>
    </div>
  );
}
