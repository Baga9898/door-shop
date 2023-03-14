import { Provider }       from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary }  from 'react-error-boundary';

import { store }     from './../redux/store';
import ErrorFallback from '../components/errorFallback/errorFallback';
import Loading       from '../components/shared/loading/loading';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={store}>
                <Loading />
                <Component {...pageProps} />
            </Provider>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </ErrorBoundary>
    );
};

export default MyApp;
