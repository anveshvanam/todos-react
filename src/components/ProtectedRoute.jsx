import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
