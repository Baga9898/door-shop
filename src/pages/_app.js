import Loading from '../components/shared/loading/loading';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Loading />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
