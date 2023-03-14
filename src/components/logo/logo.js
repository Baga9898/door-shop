import Image           from "next/image";
import Link            from "next/link";

import { rootRoute }   from "../../constants";

const Logo = () => {
    return (
        <Link href={rootRoute}>
            <Image
                src='/assets/logo.png'
                alt='logo'
                width={120}
                height={40}
            />
        </Link>
    );
};

export default Logo;