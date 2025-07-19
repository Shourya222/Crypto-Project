import React from 'react'
import { Route,Routes } from 'react-router-dom';
import CoinDetailsPage from '../../pages/CoinDetailsPage';
import Home from '../../pages/Home';
import MainLayout from '../../pages/Layout';

function Routing() {
  return (
    <div>
        <Routes>
            <Route path='/' element = {<MainLayout />}>  {/*Any route(path) that starts with / must render ManiLayout */}
                <Route index element={<Home />}/> {/*Child route */} {/*index is equivalent to path="/" */}
                <Route path="/details/:coinId" element = {<CoinDetailsPage />} /> {/*Child route */}
            </Route>

        </Routes>
    </div>
  )
}

export default Routing;
