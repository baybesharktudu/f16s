import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ThemeProvider from './components/ThemeProvider.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </PersistGate>,
);
