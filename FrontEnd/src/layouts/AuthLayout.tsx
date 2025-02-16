import { Outlet } from "react-router-dom";

export default function AuthLayaout() {
  return (
    <>
      <div className="min-h-screen">
        
          <div>
            <Outlet />
          </div>

      </div>
    </>
  );
}
