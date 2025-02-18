import { Routes, Route } from "react-router-dom";

// Auth Import
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./pages/Auth/LoginView";
import AccountNewTokenRequestView from "./pages/Auth/AccountNewTokenRequestView";
import AccountRegisterView from "./pages/Auth/AccountRegisterView";
import AccountRegisterConfirmationView from "./pages/Auth/AccountRegisterConfirmationView";
import AccountChangePasswordView from "./pages/Auth/AccountChangePasswordView";
import AccountChangePasswordConfirmationView from "./pages/Auth/AccountChangePasswordConfirmationView";

// Home Import
import HomeLayout from "./layouts/HomeLayout";
import IndexPage from "./pages/IndexPage";
//

import PrivateRoute from "./hooks/PrivateRoute";

export default function router() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginView />} />
        <Route path="/auth/accountNewToken" element={<AccountNewTokenRequestView />} />
        <Route path="/auth/accountRegister" element={<AccountRegisterView />} />
        <Route
          path="/auth/accountRegisterConfirmation"
          element={<AccountRegisterConfirmationView />}
        />
        <Route
          path="/auth/accountChangePassword"
          element={<AccountChangePasswordView />}
        />
        <Route
          path="/auth/accountChangePasswordConfirmation"
          element={<AccountChangePasswordConfirmationView />}
        />
      </Route>
      {/* Home */}
      <Route element={<PrivateRoute />}>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<IndexPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
