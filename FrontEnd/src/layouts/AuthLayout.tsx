import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  layoutContainer,
  sidebar,
  contentContainer,
} from "@/components/primitives";
import { useTheme } from "@/hooks/use-theme";

export default function AuthLayaout() {
  const { theme } = useTheme();

  return (
    <div className={layoutContainer({ theme })}>
      <div className={sidebar()} />
      <div className={contentContainer({ theme })}>
        <Outlet />
      </div>      <ToastContainer />
    </div>
  );
}
