import { Provider }   from 'react-redux';

import { store }         from './../redux/store';
import Loading           from '../components/shared/loading/loading';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Loading />
            <Component {...pageProps} />
        </Provider>
    );
};

export default MyApp;
