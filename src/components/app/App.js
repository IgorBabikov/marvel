import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {lazy, Suspense} from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const NotFound = lazy(() => import('../pages/404/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                      <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComic/>}/>
                        <Route path="*" element={<NotFound/>}/>
                      </Routes>
                    </Suspense>
               </main>
            </div>
        </Router>
    )
}

export default App;