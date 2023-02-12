import { Provider }              from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './../redux/store';
import Loading   from '../components/shared/loading/loading';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
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
        </>
    );
};

export default MyApp;
