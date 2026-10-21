import { bookEntries } from "../../data/about";
import AboutEntry from "./AboutEntry";
import AboutSection from "./AboutSection";
import "../../styles/about/BooksSection.css";

// Swap or extend books in data; their optional cover follows the shared media contract.
export default function BooksSection({ books = bookEntries }) {
	return (
		<AboutSection id="books" title="Books" introduction="Books I want to share more about soon.">
			<div className="about-books__grid">
				{books.map((book) => <AboutEntry entry={book} key={book.id} />)}
			</div>
		</AboutSection>
	);
}
