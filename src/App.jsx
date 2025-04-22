import { useState } from "react";
import Navbar from "./components/Navbar";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";

function App() {
  const [currentPage, setCurrentPage] = useState("FormBuilder");
  const [form, setForm] = useState({
    title: "About you",
    description: "Tell us about yourself",
    elements: [
      {
        id: `text-${Date.now()}`,
        type: "text",
        title: "Your name",
        required: true,
      },
      {
        id: `textarea-${Date.now() + 1}`,
        type: "textarea",
        title: "Describe yourself",
        required: false,
      },
    ],
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
