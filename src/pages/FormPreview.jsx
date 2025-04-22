import React, { useState } from "react";

const FormPreview = ({ form, setSubmittedData }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (id, value, type) => {
    if (type === "checkbox") {
      setFormValues((prev) => {
        const current = new Set(prev[id] || []);
        current.has(value) ? current.delete(value) : current.add(value);
        return { ...prev, [id]: Array.from(current) };
      });
    } else {
      setFormValues((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formValues); // pass to parent
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {form.elements.map((field) => (
          <div key={field.id}>
            <label className="block font-medium mb-1">
              {field.title}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border border-purple-500 rounded px-3 py-2"
                placeholder={`Enter ${field.title}`}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows="3"
                placeholder={`Enter ${field.title}`}
              />
            )}

            {field.type === "select" && (
              <select
                required={field.required}
                value={formValues[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-1">
                {field.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleChange(field.id, opt, "checkbox")}
                      className="accent-purple-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <span>🚀</span> Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
