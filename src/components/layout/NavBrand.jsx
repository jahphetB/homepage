import "../../styles/layout/NavBrand.css";
import { scrollToPageTop } from "../../utils/scrollToPageTop";

export default function NavBrand({ currentPage }) {
  return <a className="nav-brand" href="#/home" onClick={currentPage === "home" ? scrollToPageTop : undefined}>Yaphet Bashahider</a>;
}
