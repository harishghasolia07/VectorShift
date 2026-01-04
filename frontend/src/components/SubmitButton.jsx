import { useState } from 'react';

/* eslint-disable react/prop-types */
const SubmitButton = ({ nodes, edges }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setResult(data);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to parse pipeline:', error);
      setResult({
        error: 'Failed to connect to backend. Make sure the server is running.',
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`
          absolute bottom-6 right-6 z-10
          px-6 py-3 rounded-xl font-semibold text-sm
          bg-accent text-node-bg
          hover:bg-accent/90 hover:scale-105
          active:scale-95
          transition-all duration-200
          shadow-lg shadow-accent/25
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
        `}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <span>🚀</span>
            Submit Pipeline
          </>
        )}
      </button>

      {/* Result Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-node-bg border border-node-border rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Pipeline Summary</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {result?.error ? (
              <div className="bg-accent-red/10 border border-accent-red rounded-lg p-4">
                <p className="text-accent-red text-sm">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-node-header rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-accent">
                      {result?.num_nodes || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Nodes</p>
                  </div>
                  <div className="bg-node-header rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-accent">
                      {result?.num_edges || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Edges</p>
                  </div>
                </div>

                <div
                  className={`
                    rounded-lg p-4 text-center border-2
                    ${
                      result?.is_dag
                        ? 'bg-accent-green/10 border-accent-green'
                        : 'bg-accent-red/10 border-accent-red'
                    }
                  `}
                >
                  <p className="text-lg font-semibold">
                    {result?.is_dag ? (
                      <span className="text-accent-green">✓ Valid DAG</span>
                    ) : (
                      <span className="text-accent-red">✗ Contains Cycles</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {result?.is_dag
                      ? 'Pipeline has no circular dependencies'
                      : 'Pipeline has circular dependencies that need to be resolved'}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 px-4 py-2 bg-node-header border border-node-border rounded-lg text-white hover:bg-node-header/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitButton;
