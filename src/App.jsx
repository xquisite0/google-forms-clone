import { useState } from "react";
import Navbar from "./components/Navbar";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";

function App() {
  const [currentPage, setCurrentPage] = useState("FormBuilder");
  const [form, setForm] = useState({
    title: "About you",
    description: "Tell us about yourself",
    elements: [],
  });

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "FormBuilder" && (
        <FormBuilder form={form} setForm={setForm} />
      )}
      {currentPage === "FormPreview" && <FormPreview />}
    </div>
  );
}

export default App;
