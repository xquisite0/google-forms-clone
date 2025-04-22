import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("FormBuilder");

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <h1 class="text-3xl font-bold underline">Hello World</h1>
    </div>
  );
}

export default App;
