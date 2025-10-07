
import React, { useState, useCallback } from 'react';
import { solvePythonProblem } from './services/geminiService';
import Header from './components/Header';
import ResponseDisplay from './components/ResponseDisplay';
import { SendIcon } from './components/Icons';

const examplePrompts = [
  "How to reverse a list in Python?",
  "Explain Python decorators with a simple example.",
  "Write a Python script to read a CSV file.",
  "What is the difference between `list` and `tuple` in Python?"
];

interface ExamplePromptsProps {
  onPromptClick: (prompt: string) => void;
  disabled: boolean;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onPromptClick, disabled }) => (
  <div className="flex flex-wrap justify-center gap-2 mt-4">
    {examplePrompts.map((prompt, index) => (
      <button
        key={index}
        onClick={() => onPromptClick(prompt)}
        disabled={disabled}
        className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-gray-200 rounded-lg transition-colors"
      >
        {prompt}
      </button>
    ))}
  </div>
);

const App: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!query.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const result = await solvePythonProblem(query);
            setResponse(result);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
            setError(`Failed to get response: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [query, isLoading]);

    const handlePromptClick = (prompt: string) => {
        setQuery(prompt);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl">
                <Header />
                <main className="mt-8">
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-2xl shadow-blue-500/5">
                        <h2 className="text-lg font-semibold text-gray-200 mb-4">Enter your Python problem</h2>
                        <div className="relative">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., How to implement a binary search tree in Python?"
                                className="w-full h-36 p-4 pr-20 bg-gray-900/70 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-gray-100"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !query.trim()}
                                className="absolute bottom-3 right-3 flex items-center justify-center h-10 w-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                aria-label="Solve Problem"
                            >
                                <SendIcon />
                            </button>
                        </div>
                        <ExamplePrompts onPromptClick={handlePromptClick} disabled={isLoading} />
                    </div>

                    <div className="mt-8">
                        <ResponseDisplay
                            response={response}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
