import toast, { Toaster } from 'react-hot-toast';

const toastAlerts = (message) => {
  if (message.error) {
    return toast.error(message.error)
  } else {
    return toast.success(message.success)
  }
};

export default toastAlerts