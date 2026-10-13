import githubIcon from "../../assets/icons/github.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import "../styles/SocialLinks.css";

const links = [
  { id: "github", name: "GitHub", icon: githubIcon, url: "https://github.com/jahphetB" },
  { id: "linkedin", name: "LinkedIn", icon: linkedInIcon, url: "https://www.linkedin.com/in/yaphet-bashahider-6716a3222" },
  { id: "twitter", name: "X", icon: twitterIcon, url: "https://x.com" },
];

export default function SocialLinks({ location }) {
  return (
    <div id={`${location}-social-links`} className="social-links">
      {links.map(({ id, name, icon, url }) => (
        <a key={id} id={`${location}-${id}-link`} className="social-link" href={url} aria-label={name} target="_blank" rel="noreferrer">
          <img id={`${location}-${id}-icon`} className="social-icon" src={icon} alt="" />
        </a>
      ))}
    </div>
  );
}
