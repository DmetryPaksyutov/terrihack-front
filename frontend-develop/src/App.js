import React, { useState } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Layout} from 'antd';


import store from './redux/store';

import st from './App.module.css';

import Navbar from './components/Widgets/Navbar/Navbar';
import AppFooter from "./components/Widgets/Footer/Footer";
import UploadFiles from "./components/Pages/UploadFiles/UploadFiles";

import FindPage from "./components/Pages/FindPage/FindPage";

import PriceList from './components/Pages/PriceList/pricelist';
import CardList from './components/Widgets/CandidateCard/CardList';
import AiFindPage from "./components/Pages/AiFindPage/AiFindPage";
import CandidateCard from './components/Widgets/CandidateCard/CandidateCard';
//import LoginPage from "./components/Pages/Auth/Login/LoginPage";


const App = () => {  
    return (
        <Provider store={store}>
        <div className={st.appContainer}>

                <Router>
                    <Navbar/>
                    {/*<Layout.Content className={st.content}>*/}
                    <div className={st.content}>

                        <Routes>
                            <Route path="/" element={<AiFindPage/>} />
                            <Route path="/upload" element={<UploadFiles/>} />
                            <Route path={'/find'} element={<FindPage/>} />
                            <Route path="/integration" element={<PriceList/>} />
                        </Routes>
                    {/*</Layout.Content>*/}
                    </div>

                    <AppFooter/>
                </Router>

        </div>
        </Provider>
    );
};
export default App;
