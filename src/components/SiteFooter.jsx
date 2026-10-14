import "../styles/SiteFooter.css";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__section site-footer__identity">
        <span className="site-footer__label">Yaphet Bashahider™</span>
        <p>© {new Date().getFullYear()} Yaphet Bashahider.</p>
      </div>
      <div className="site-footer__section site-footer__license">
        <span className="site-footer__label">License</span>
        <p>Licensing information has not been published.</p>
      </div>
      <div className="site-footer__section site-footer__developer">
        <span className="site-footer__label">Developer</span>
        <p>Designed and developed by Yaphet Bashahider.</p>
      </div>
    </footer>
  );
}
