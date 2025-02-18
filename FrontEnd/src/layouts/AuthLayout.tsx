import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthLayaout() {
  return (
    <>
      <div className="min-h-screen">
        <div>
          <Outlet />
        </div>

        <ToastContainer/>
      </div>
    </>
  );
}
