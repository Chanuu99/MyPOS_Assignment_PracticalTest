import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    NavBar,
    Footer
} from "../components";


import {
    Home,
    View
} from "../pages";

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/view" element={<View />} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}

export default App;