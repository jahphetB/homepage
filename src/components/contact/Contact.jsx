import SocialLinks from "./SocialLinks";
import ContactIntro from "./ContactIntro";
import ContactDetails from "./ContactDetails";
import ContactPortrait from "./ContactPortrait";
import "../../styles/contact/Contact.css";

export default function Contact() {
  return (
    <section id="contact-section" aria-labelledby="contact-heading">
      <div id="contact-content">
        <ContactIntro />
        <ContactDetails />
        <SocialLinks location="contact" />
      </div>
      <ContactPortrait />
    </section>
  );
}
