import React, { useState } from "react";

const FormPreview = ({ form, setSubmittedData }) => {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted");
      setLoading(false);
      setSubmittedData(formValues);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {form.elements.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-medium mb-1">
              {field.title}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.type === "text" && (
              <input
                id={field.id}
                type="text"
                required={field.required}
                aria-required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border border-purple-500 rounded px-3 py-2"
                placeholder={`Enter ${field.title}`}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                id={field.id}
                required={field.required}
                aria-required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows="3"
                placeholder={`Enter ${field.title}`}
              />
            )}

            {field.type === "select" && (
              <select
                id={field.id}
                required={field.required}
                aria-required={field.required}
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
              <div className="space-y-1" id={field.id}>
                <fieldset>
                  {field.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2"
                      htmlFor={`${field.id}-${idx}`}
                    >
                      <input
                        id={`${field.id}-${idx}`}
                        type="checkbox"
                        onChange={() => handleChange(field.id, opt, "checkbox")}
                        className="accent-purple-500"
                      />
                      {opt}
                    </label>
                  ))}
                </fieldset>
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            <>🚀 Submit</>
          )}
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
