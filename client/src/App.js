import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Dashboard, Error, Register } from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";
import {
  AllJobs,
  AddJob,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard/index.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

// const Wrapper = styled.nav`
//   a {
//     margin-left: 1rem;
//   }
// `;

export default App;
