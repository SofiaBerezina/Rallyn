import { Outlet } from "react-router-dom";
import * as React from "react";

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
