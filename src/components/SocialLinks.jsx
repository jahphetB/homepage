import githubIcon from "../../assets/icons/github.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import "./SocialLinks.css";

const links = [
  { id: "github", name: "GitHub", icon: githubIcon },
  { id: "linkedin", name: "LinkedIn", icon: linkedInIcon },
  { id: "twitter", name: "X", icon: twitterIcon },
];

export default function SocialLinks({ location }) {
  return (
    <div id={`${location}-social-links`} className="social-links">
      {links.map(({ id, name, icon }) => (
        <a key={id} id={`${location}-${id}-link`} className="social-link" href="#" aria-label={name}>
          <img id={`${location}-${id}-icon`} className="social-icon" src={icon} alt="" />
        </a>
      ))}
    </div>
  );
}
