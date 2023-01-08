import { createContext, useState } from "react";
import Toast from "./Toast";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [openToast, setOpenToast] = useState(false);
  const [toastProps, setToastProps] = useState();
  const setToast = (props) => {
    setOpenToast(true);
    setToastProps(props);
  };
  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
      <Toast open={openToast} setOpen={setOpenToast} {...toastProps} />
    </ToastContext.Provider>
  );
};
