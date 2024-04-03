import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import theme from './theme';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

// Remove?
// import { createTheme, ThemeProvider } from '@mui/material/styles';
//
// const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <CssBaseline/>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
