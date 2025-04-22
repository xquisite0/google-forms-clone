import { FaRegSave } from "react-icons/fa"; // Save icon
import { HiOutlineDocumentText } from "react-icons/hi"; // Form icon

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      {/* Left: App Icon and Title */}
      <button
        className="flex items-center gap-2"
        onClick={() => setCurrentPage("FormBuilder")}
      >
        <HiOutlineDocumentText className="text-purple-600 text-2xl" />
        <h1 className="text-xl font-semibold text-gray-900">Form Builder</h1>
      </button>

      {/* Right: Save and Preview Buttons */}
      <div className="flex items-center gap-3">
        {/* TODO: implement save for persistence through refreshes */}
        <button className="flex items-center gap-2 border rounded px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100">
          <FaRegSave />
          Save
        </button>
        <button
          className="border rounded px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
          onClick={
            currentPage === "FormBuilder"
              ? () => setCurrentPage("FormPreview")
              : () => setCurrentPage("FormBuilder")
          }
        >
          {/* check if current page state is formbuilder, and conditionally render */}
          {currentPage === "FormBuilder" ? "Preview Form" : "Edit Form"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
