import { scrollToPageTop } from "../../utils/scrollToPageTop";
import "../../styles/layout/BackToTop.css";

export default function BackToTop() {
  return (
    <div className="back-to-top">
      <button className="back-to-top__button" type="button" onClick={scrollToPageTop}>
        <span className="back-to-top__arrow" aria-hidden="true">↑</span>
        Back to top
      </button>
    </div>
  );
}
