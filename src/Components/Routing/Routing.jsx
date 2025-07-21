import React, { lazy, Suspense} from 'react'
import { Route,Routes } from 'react-router-dom';
import MainLayout from '../../pages/Layout';
import PageLoader from '../PageLoader/PageLoader';
import CustomErrorBoundary from '../CoinTable/CustomErrorBoundary/CustomErrorBoundary';
const Home = lazy(() => import('../../pages/Home'));
const CoinDetailsPage = lazy(() => import('../../pages/CoinDetailsPage'));

function Routing() {
  return (
    <div>
      <CustomErrorBoundary>
        <Routes>
            <Route path='/' element = {<MainLayout />}>  {/*Any route(path) that starts with / must render ManiLayout */}
                <Route index element={
                  <Suspense fallback={<PageLoader/>}>
                    <Home />
                  </Suspense>
                  
                  }/> {/*Child route */} {/*index is equivalent to path="/" */}
                <Route path="/details/:coinId" element = {                 
                  <Suspense fallback={<PageLoader />}>
                    <CoinDetailsPage />
                  </Suspense>
                } /> 
            </Route>

        </Routes>
      </CustomErrorBoundary>
    </div>
  )
}

export default Routing;
