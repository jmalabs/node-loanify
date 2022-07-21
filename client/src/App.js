import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Dashboard, Error, Register } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Link to="/">Dashboard</Link>
        <Link to="/register">Register</Link>
        <Link to="/landing">Landing</Link>
      </Wrapper>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const Wrapper = styled.nav`
  a {
    margin-left: 1rem;
  }
`;

export default App;
