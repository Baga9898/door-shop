// Refactoring need
import { toast } from 'react-toastify';

const defaultNotifySpecs = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const notify = (status, text) => {
    switch (status) {
        case 'success':
            toast.success(text, {
                ...defaultNotifySpecs,
            });
            break;
      
        case 'error':
            toast.error(text, {
                ...defaultNotifySpecs,
            });
            break;

        case 'warn':
            toast.warn(text, {
                ...defaultNotifySpecs,
            });
            break;

        case 'info':
            toast.info(text, {
                ...defaultNotifySpecs,
            });
            break;
    }
};
