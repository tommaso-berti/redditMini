import { useState } from 'react'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import './App.css'
import './index.css'
import Header from "./features/header/Header.jsx";

export default function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" />
                <Route path="/about" element={<h1>About Page</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}
