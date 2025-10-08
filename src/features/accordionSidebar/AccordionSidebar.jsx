import './accordionSidebar.css';
import {selectAuthors} from "../../store/authorsSlice.js";
import {useSelector} from "react-redux";
import AccordionMenuItem from "../../components/accordionMenuItem/AccordionMenuItem.jsx";

export default function AccordionSidebar() {
    const authors = useSelector(selectAuthors);
    console.log(authors);
    return (
        <menu className="accordionSidebar">
            <ul className="author">
                {authors && authors.length > 0 ? (
                    authors.map((author) => (
                        <AccordionMenuItem key={author} author={author} />
                    ))
                ) : (
                    <li>Nessun autore disponibile</li>
                )}
            </ul>
            <div className="subreddit">

            </div>
        </menu>
    )
}