"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 mr-2"
      aria-label="Print Page"
      title="Print this chapter"
    >
      <Printer size={20} />
    </button>
  );
}
