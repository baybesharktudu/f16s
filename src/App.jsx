import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Header from './components/Header';
import Footer from './components/Footer';
import Account from './pages/Account';
import Home from './pages/Home';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/account" element={<Account />} />
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<h1>Có cc</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
