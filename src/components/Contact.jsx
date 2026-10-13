import contactImage from "../../assets/images/contact.jpg";
import emailIcon from "../../assets/icons/email.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import SocialLinks from "./SocialLinks";
import "./Contact.css";

export default function Contact() {
  return (
    <footer id="contact-section">
      <div id="contact-content">
        <h2 id="contact-heading" className="section-heading">Contact me</h2>
        <p id="contact-introduction">Please get in touch if you think our work could be mutually beneficial!</p>
        <address id="contact-details">
          <p id="contact-address">1234 Random Road<br />Random Town, California 12345</p>
          <p id="contact-phone" className="contact-row"><img id="contact-phone-icon" className="contact-icon" src={phoneIcon} alt="" /><span id="contact-phone-number">555-555-5555</span></p>
          <p id="contact-email" className="contact-row"><img id="contact-email-icon" className="contact-icon" src={emailIcon} alt="" /><span id="contact-email-address">this.is.not.real@gmail.com</span></p>
        </address>
        <SocialLinks location="contact" />
      </div>
      <div id="contact-image-box"><img id="contact-image" src={contactImage} alt="Yaphet Bashahider working on a laptop" /></div>
    </footer>
  );
}
