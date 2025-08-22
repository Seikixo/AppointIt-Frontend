import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCredentials,
  selectUser,
  setCredentials,
} from "./store/authSlice";
import { useEffect } from "react";
import { getUser } from "./services/auth";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !user) {
      getUser()
        .then((res) => {
          const firstOrganization = res.data.users.organizations?.[0] || null;
          const transformedUserData = {
            id: res.data.users.id,
            name: res.data.users.name,
            email: res.data.users.email,
            role: res.data.users.roles?.[0]?.name || "customer",
            organization: firstOrganization
              ? {
                  id: firstOrganization.id,
                  user_id: firstOrganization.user_id,
                  name: firstOrganization.name,
                  description: firstOrganization.description,
                  email: firstOrganization.email,
                  contact_number: firstOrganization.contact_number,
                  address: firstOrganization.address,
                }
              : null,
          };
          dispatch(setCredentials({ user: transformedUserData }));
        })
        .catch(() => {
          dispatch(clearCredentials());
        });
    }
  }, [dispatch, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
