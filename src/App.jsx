import {Route, BrowserRouter, Routes} from "react-router-dom";
import './App.css'
import './index.css'
import Header from "./components/header/Header.jsx";
import Feed from "./features/feed/Feed.jsx";
import AccordionSidebar from "./features/accordionSidebar/AccordionSidebar.jsx";

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
                        <Route path="/" element={<Feed />} />
                        <Route path="/about" element={<h1>About Page</h1>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
