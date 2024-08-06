import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/authentication" element={<Authentication />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
