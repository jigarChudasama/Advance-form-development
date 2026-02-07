import { toast } from "react-toastify"

export const useMessage = () => {

  const config = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
  }

  const messageSuccess = (msg) => {
    toast.success(msg, config)
  }

  const messageError = (msg) => {
    toast.error(msg, config)
  }

  const messageInfo = (msg) => {
    toast.info(msg, config)
  }

  const messageWarning = (msg) => {
    toast.warning(msg, config)
  }

  return {
    messageSuccess,
    messageError,
    messageInfo,
    messageWarning
  }
}