import contactImage from "../../../assets/images/Yaphet_Bashahider.png";
import "../../styles/contact/ContactPortrait.css";

export default function ContactPortrait() {
  return (
    <div id="contact-image-box">
      <img id="contact-image" src={contactImage} alt="Yaphet Bashahider headshot" />
    </div>
  );
}
