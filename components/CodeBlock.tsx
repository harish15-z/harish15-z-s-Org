import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error("Failed to copy code to clipboard: ", err);
        });
    };

    return (
        <div className="relative bg-gray-900 rounded-lg my-4 text-sm font-mono border border-gray-700 shadow-lg shadow-black/20">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                <span className="text-gray-400 text-xs">Python</span>
                <button
                    onClick={handleCopy}
                    disabled={isCopied}
                    aria-live="polite"
                    className={`flex items-center gap-1.5 px-2 py-1 text-xs rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
                        isCopied
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {isCopied ? (
                        <>
                            <CheckIcon />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <CopyIcon />
                            <span>Copy Code</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-gray-200">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;