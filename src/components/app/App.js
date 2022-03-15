import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {lazy, Suspense} from "react";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SinglePage from "../pages/SinglePage";


const NotFound = lazy(() => import('../pages/404/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'));
const SingleCharacter = lazy(() => import('../pages/singleCharacter/SingleCharacter'))

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
                        <Route path='/comics/:id' element={<SinglePage Component={SingleComic} dataType='comic'/>}/>
                        <Route path='/characters/:id' element={ <SinglePage Component={SingleCharacter} dataType='character'/>}/>
                        <Route path="*" element={<NotFound/>}/>
                      </Routes>
                    </Suspense>
               </main>
            </div>
        </Router>
    )
}

export default App;