import ROUTES from '../../routes.js';
import {Link} from "react-router";
import './accordionMenuItem.css'

export default function AccordionMenuItem({author}) {
    return (
        <li className="accordionMenuButton" key={author}>
            <Link to={ROUTES.authors(author)}>{author}</Link>
        </li>
    )
}