import { useState } from "react";
import Navbar from "./components/Navbar";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";

function App() {
  const [currentPage, setCurrentPage] = useState("FormBuilder");

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "FormBuilder" && <FormBuilder />}
      {currentPage === "FormPreview" && <FormPreview />}
    </div>
  );
}

export default App;
