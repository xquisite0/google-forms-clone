const SuccessPage = ({ data, onBack }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow max-w-xl w-full text-center">
      <div className="text-green-500 text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-semibold">Form submitted successfully!</h2>
      <p className="text-gray-600 mb-6">Thank you for your submission.</p>

      <pre className="bg-gray-100 text-left rounded p-4 font-mono text-sm whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>

      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-purple-600 text-white rounded"
      >
        ← Back to form
      </button>
    </div>
  </div>
);

export default SuccessPage;
