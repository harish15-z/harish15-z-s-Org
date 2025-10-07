import React from 'react';
import CodeBlock from './CodeBlock';
import { LoadingSpinner } from './Icons';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

interface ParsedContent {
  type: 'text' | 'code';
  content: string;
}

const parseResponse = (responseText: string): ParsedContent[] => {
  if (!responseText) return [];
  
  const parts = responseText.split(/(```python[\s\S]*?```)/g);
  
  // FIX: Add explicit return type 'ParsedContent' to the map callback to prevent the 'type' property from being widened to 'string'.
  return parts.map((part): ParsedContent => {
    if (part.startsWith('```python')) {
      return {
        type: 'code',
        content: part.replace(/^```python\n?|```$/g, '').trim(),
      };
    }
    return { type: 'text', content: part };
  }).filter(part => part.content.trim() !== '');
};

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 border border-gray-700 rounded-xl min-h-[200px]">
        <LoadingSpinner />
        <p className="mt-4 text-gray-300">Thinking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/20 border border-red-500/30 text-red-300 rounded-xl">
        <h3 className="font-semibold mb-2">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-800/50 border border-gray-700 rounded-xl min-h-[200px]">
        <p className="text-gray-400">Your solution will appear here.</p>
      </div>
    );
  }

  const parsedContent = parseResponse(response);

  return (
    <div className="bg-gray-800/50 p-6 border border-gray-700 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Solution</h3>
      <div className="prose prose-lg prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:text-gray-100">
        {parsedContent.map((part, index) => {
          if (part.type === 'code') {
            return <CodeBlock key={index} code={part.content} />;
          }
          // Split text block into paragraphs based on one or more empty lines
          const paragraphs = part.content.trim().split(/\n\s*\n/);
          return paragraphs.map((paragraph, pIndex) => {
              if (paragraph.trim() === '') return null;
              return (
                  <p key={`${index}-${pIndex}`} className="whitespace-pre-wrap">
                      {paragraph}
                  </p>
              );
          });
        })}
      </div>
    </div>
  );
};

export default ResponseDisplay;