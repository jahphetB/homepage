import emailIcon from "../../assets/icons/email-black.svg";
import "../styles/ContactDetails.css";

export default function ContactDetails() {
  return (
    <address id="contact-details">
      <p id="contact-address">2112 Cleveland Blvd<br />Caldwell, Idaho 83605</p>
      <p id="contact-email" className="contact-row">
        <img id="contact-email-icon" className="contact-icon" src={emailIcon} alt="" />
        <a id="contact-email-address" href="mailto:japhetlakew098@gmail.com">japhetlakew098@gmail.com</a>
      </p>
    </address>
  );
}
