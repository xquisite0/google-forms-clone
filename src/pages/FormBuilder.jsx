import React, { useState } from "react";

const FormBuilder = ({ form, setForm }) => {
  const updateFormTitle = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const updateFormDescription = (e) => {
    setForm({ ...form, description: e.target.value });
  };

  return (
    <div className="flex p-6 gap-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Add Form Elements</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-2 border rounded hover:bg-gray-100">Text</button>
          <button className="p-2 border rounded hover:bg-gray-100">
            Paragraph
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            Checkbox
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
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
              <label className="block font-semibold mb-2">{field.title}</label>

              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full border px-3 py-2 rounded"
                  required={field.required}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full border px-3 py-2 rounded"
                  required={field.required}
                />
              )}

              <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    className="accent-purple-600"
                  />
                  Required
                </label>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-500"
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
