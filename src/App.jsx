import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";

function App() {
  const [currentPage, setCurrentPage] = useState("FormBuilder");
  const [form, setForm] = useState({
    title: "Form Title",
    description: "Form Description",
    elements: [],
  });

  const handleSave = () => {
    localStorage.setItem("form", JSON.stringify(form));
    alert("Form saved successfully!");
  };

  useEffect(() => {
    const saved = localStorage.getItem("form");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleSave={handleSave}
      />
      {currentPage === "FormBuilder" && (
        <FormBuilder form={form} setForm={setForm} />
      )}
      {currentPage === "FormPreview" && <FormPreview />}
    </div>
  );
}

export default App;
