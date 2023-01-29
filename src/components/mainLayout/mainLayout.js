import { Montserrat }   from '@next/font/google';

import CustomHead       from "../head/head";
import Footer           from "../footer/footer";
import Header           from "../header/header";

import styles           from './mainLayout.module.scss';

const font = Montserrat({
    subsets: ['cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  });

const MainContainer = ({ children, keywords, title }) => {    
    return (
        <div className={styles.container} style={font.style}>
            <CustomHead keywords={keywords} title={title} />
            <Header />
            {/* {title && <h1>{title}</h1>} */}
            { children }
            <Footer />
        </div>
    );
};

export default MainContainer;