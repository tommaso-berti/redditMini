import './accordionSidebar.css';
import {selectAuthors} from "../../store/authorsSlice.js";
import {useSelector} from "react-redux";
import AccordionMenuItem from "../../components/accordionMenuItem/AccordionMenuItem.jsx";

export default function AccordionSidebar() {
    const authors = useSelector(selectAuthors);
    return (
        <menu className="accordionSidebar">
            <div className="author">
                {authors.forEach((author) => <AccordionMenuItem author={author} />)}
            </div>
            <div className="subreddit">

            </div>
        </menu>
    )
}