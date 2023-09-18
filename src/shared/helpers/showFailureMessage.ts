import { toast } from "react-toastify";

export function showFailureMessage(message: string = 'Error') {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
}