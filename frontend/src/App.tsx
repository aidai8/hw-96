import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import AdminLayout from "./features/admin/AdminLayout.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import NewCocktail from "./features/cocktails/NewCocktail.tsx";
import FullCocktail from "./features/cocktails/FullCocktail.tsx";
import MyCocktailsList from "./features/cocktails/MyCocktailsList.tsx";
import AdminCocktailsList from "./features/admin/cocktails/AdminCocktailsList.tsx";


const App = () => {
    const user = useAppSelector(selectUser);

  return (
      <>
          <CssBaseline />
          <ToastContainer />
          <header>
              <AppToolbar />
          </header>
          <main>
              <Container maxWidth="xl" sx={{py: 3}}>
                  <Routes>
                      <Route path="/" element={<Cocktails/>}/>
                      <Route path="/cocktails" element={<Cocktails/>}/>
                      <Route path="/login" element={<Login/>} />
                      <Route path="/register" element={<Register/>} />

                      <Route
                          path="/cocktails/new"
                          element={
                              <ProtectedRoute isAllowed={!!user}>
                                  <NewCocktail />
                              </ProtectedRoute>
                          }
                      />

                      <Route path="/cocktails/:id" element={<FullCocktail />} />

                      <Route
                          path="/my-cocktails"
                          element={
                              <ProtectedRoute isAllowed={!!user}>
                                  <MyCocktailsList />
                              </ProtectedRoute>
                          }
                      />

                      <Route path='admin' element={
                          <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                              <AdminLayout/>
                          </ProtectedRoute>
                      }>
                          <Route path="cocktails" element={<AdminCocktailsList />} />
                      </Route>

                      <Route path="*" element={<Typography variant="h4">Not found page</Typography>} />
                  </Routes>
              </Container>
          </main>
      </>
  );
};

export default App;
