import { ToastContainer, toast } from "react-toastify";


const Toast = () => {
  return <ToastContainer autoClose={3000}/>
}

const useToast = () => {
  const toastError = (message: string, position: string = 'top-right') => {
    return toast.error(message, { position: position as any })
  }

  const toastSuccess = (message: string, position: string = 'top-right') => {
    return toast.success(message, { position: position as any })
  }

  return { toastError, toastSuccess }
}

export { useToast, Toast }
