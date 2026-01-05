import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-brand-600 text-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">Reading Tracker</h1>
        </div>
      </div>
    </header>
  );
}
