import profileImage from "../../assets/images/Yaphet_Bashahider.jpg";
import SocialLinks from "./SocialLinks";
import "../styles/About.css";

export default function About() {
  return (
    <header id="about-section">
      <div id="about-background-shape" />
      <div id="about-layout">
        <div id="profile-image-box" className="profile-image-box"><img id="profile-image" src={profileImage} alt="Portrait of Yaphet Bashahider" /></div>
        <div id="profile-name-box" className="profile-name-box"><h1 id="profile-name">Yaphet Bashahider</h1></div>
        <div id="about-card" className="about-card">
          <h2 id="about-heading" className="section-heading">About me</h2>
          <p id="about-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <SocialLinks location="about" />
        </div>
      </div>
    </header>
  );
}
