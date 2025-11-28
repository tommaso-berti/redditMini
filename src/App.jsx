import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css'
import Header from "./components/header/Header.jsx";
import Feed from "./features/feed/Feed.jsx";
import AccordionSidebar from "./features/accordionSidebar/AccordionSidebar.jsx";
import ROUTES from './routes.js';

export default function App() {

    return (
        <BrowserRouter>
            <div className="app-layout">
                <Header />
                <div className="main-content">
                    <div className="accordion-sidebar">
                        <AccordionSidebar />
                    </div>
                    <Routes>
                        <Route path={ROUTES.home} element={<Feed />} />
                        <Route path={ROUTES.authors()} element={<Feed />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
