import CustomHead from "../head/head";
import Navigation from "../navigation/navigation";

import styles from './mainLayout.module.scss';

const MainContainer = ({ children, keywords, title }) => {
    return (
        <div className={styles.layout}>
            <CustomHead keywords={keywords} title={title} />
            <Navigation />
            <h1>{title}</h1>
            { children }
        </div>
    );
};

export default MainContainer;