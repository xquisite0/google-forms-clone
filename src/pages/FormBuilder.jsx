import React, { useState } from "react";

const FormBuilder = ({ form, setForm }) => {
  const updateFormTitle = (e) => {
    setForm((prev) => ({ ...prev, title: e.target.value }));
  };

  const updateFormDescription = (e) => {
    setForm((prev) => ({ ...prev, description: e.target.value }));
  };

  const updateFieldTitle = (id, newTitle) => {
    setForm((prev) => ({
      ...prev,
      elements: prev.elements.map((f) =>
        f.id === id ? { ...f, title: newTitle } : f
      ),
    }));
  };

  const toggleRequired = (id) => {
    setForm((prev) => ({
      ...prev,
      elements: prev.elements.map((f) =>
        f.id === id ? { ...f, required: !f.required } : f
      ),
    }));
  };

  const deleteField = (id) => {
    setForm((prev) => ({
      ...prev,
      elements: prev.elements.filter((f) => f.id !== id),
    }));
  };

  const addField = (type) => {
    const timestamp = Date.now();
    const id = `${type}-${timestamp}`;

    let newField = {
      id,
      type,
      title: `New ${type} field`,
      required: false,
    };

    if (type === "checkbox" || type === "select") {
      newField.options = ["Option 1", "Option 2"];
    }

    setForm((prev) => ({
      ...prev,
      elements: [...prev.elements, newField],
    }));
  };

  const updateOption = (id, index, newOption) => {
    setForm((prev) => ({
      ...prev,
      elements: prev.elements.map((f) => {
        if (f.id === id) {
          f.options[index] = newOption;
        }
        return f;
      }),
    }));
  };

  const addOption = (id) => {
    setForm((prev) => ({
      ...prev,
      elements: prev.elements.map((f) =>
        f.id === id
          ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] }
          : f
      ),
    }));
  };

  const removeOption = (id, index) => {
    setForm((prev) => ({
      ...prev,
      elements: prev.elements.map((f) =>
        f.id === id
          ? {
              ...f,
              options: f.options.filter((_, idx) => idx !== index),
            }
          : f
      ),
    }));
  };

  return (
    <div className="flex p-6 gap-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Add Form Elements</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="p-2 border rounded hover:bg-gray-100"
            onClick={() => addField("text")}
          >
            Text
          </button>
          <button
            className="p-2 border rounded hover:bg-gray-100"
            onClick={() => addField("textarea")}
          >
            Paragraph
          </button>
          <button
            className="p-2 border rounded hover:bg-gray-100"
            onClick={() => addField("checkbox")}
          >
            Checkbox
          </button>
          <button
            className="p-2 border rounded hover:bg-gray-100"
            onClick={() => addField("select")}
          >
            Select
          </button>
        </div>
      </div>

      {/* Form Editor */}
      <div className="flex-1 bg-white rounded shadow p-6">
        {/* Form Title & Description Inputs */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={updateFormTitle}
          placeholder="Form Title"
          className="text-2xl font-bold mb-1 w-full outline-none bg-transparent"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={updateFormDescription}
          placeholder="Form Description"
          className="text-sm text-gray-500 mb-6 w-full outline-none bg-transparent"
        />

        <form>
          {form.elements.map((field) => (
            <div key={field.id} className="mb-6 border p-4 rounded bg-gray-50">
              <input
                type="text"
                value={field.title}
                onChange={(e) => updateFieldTitle(field.id, e.target.value)}
                className="block font-semibold mb-2 w-full bg-transparent outline-none"
              />

              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={`Enter ${field.title}`}
                  className="w-full border px-3 py-2 rounded"
                  required={field.required}
                  readOnly
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  placeholder={`Enter ${field.title}`}
                  rows={3}
                  className="w-full border px-3 py-2 rounded"
                  required={field.required}
                  readOnly
                />
              )}

              {field.type === "select" && (
                <>
                  <select className="w-full border px-3 py-2 rounded text-gray-500 bg-white">
                    <option selected disabled>
                      Select an option
                    </option>
                    {field.options.map((opt, idx) => (
                      <option key={idx}>{opt}</option>
                    ))}
                  </select>

                  <p className="mt-3 mb-1 text-sm font-medium">Options:</p>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(field.id, index, e.target.value)
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(field.id, index)}
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(field.id)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Add option
                  </button>
                </>
              )}

              {field.type === "checkbox" && (
                <>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input type="checkbox" disabled />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(field.id, index, e.target.value)
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(field.id, index)}
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(field.id)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Add option
                  </button>
                </>
              )}

              <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    className="accent-purple-600"
                    onClick={() => toggleRequired(field.id)}
                    readOnly
                  />
                  Required
                </label>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => deleteField(field.id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default FormBuilder;
