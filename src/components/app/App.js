import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {MainPage, ComicsPage, NotFound} from '../pages'

import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path="*" element={<NotFound/>}></Route>
                    </Routes>
               </main>
            </div>
        </Router>
    )
}

export default App;