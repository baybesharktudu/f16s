import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Header from './components/Header';
import Footer from './components/Footer';
import Account from './pages/Account';
import Home from './pages/Home';
import WrapperShow from './components/WrapperShow';
import PrivateRoute from './components/PrivateRoute';
import PrivateAuthentication from './components/PrivateAuthentication';

export default function App() {
    return (
        <BrowserRouter>
            <WrapperShow>
                <Header />
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/account/:id" element={<Account />} />
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<PrivateAuthentication />}>
                        <Route path="/authentication" element={<Authentication />} />
                    </Route>
                    <Route path="/*" element={<h1>Có cc</h1>} />
                </Routes>
                <Footer />
            </WrapperShow>
        </BrowserRouter>
    );
}
