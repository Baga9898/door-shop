import CustomHead from "../head/head";
import Header     from "../header/header";

import { Montserrat } from '@next/font/google';

import styles     from './mainLayout.module.scss';
import Footer from "../footer/footer";

const font = Montserrat({
    subsets: ['cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  });

const MainContainer = ({ children, keywords, title }) => {
    return (
        <div className={styles.container} style={font.style}>
            <CustomHead keywords={keywords} title={title} />
            <Header />
            <h1>{title}</h1>
            { children }
            <Footer />
        </div>
    );
};

export default MainContainer;