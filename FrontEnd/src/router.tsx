import { Routes, Route } from "react-router-dom";

// Auth Import
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./pages/Auth/LoginView";
import AccountRegisterView from "./pages/Auth/AccountRegisterView";
import AccountChangePassword from "./pages/Auth/AccountChangePassword";

// Home Import
import HomeLayout from "./layouts/HomeLayout";
import IndexPage from "./pages/IndexPage";
//


// import PrivateRoute from "./hooks/PrivateRoute";

export default function router() {
  return (
      <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginView />} />
            <Route path="/auth/accountRegister" element={<AccountRegisterView />} />
            <Route path="/auth/accountChangePassword" element={<AccountChangePassword />} />
          </Route>
        {/* Home */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<IndexPage />} />
          </Route>
      </Routes>
  );
}
