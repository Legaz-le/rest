"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function FilterControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const region = searchParams.get("region") || "";
  const searchQueryFromUrl = searchParams.get("search") || "";

  // Local state for input
  const [inputValue, setInputValue] = useState(searchQueryFromUrl);

  // Update local state on URL param change (for when region changes etc)
  useEffect(() => {
    setInputValue(searchQueryFromUrl);
  }, [searchQueryFromUrl]);

  // Debounce updateQuery call
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (inputValue) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }
      router.push(`/?${params.toString()}`);
    }, ); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [inputValue, router, searchParams]);

  // For region change, update URL immediately on select change
  const onRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (e.target.value) {
      params.set("region", e.target.value);
    } else {
      params.delete("region");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="container mx-auto flex items-center justify-between py-8">
      <div className="flex items-center bg-White border border-White rounded-md px-4 py-2 w-full max-w-md shadow-md dark:bg-Blue-900 dark:text-White dark:border-Blue-900">
        <svg
          className="w-5 h-5 text-Grey-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="..." />
        </svg>
        <input
          type="text"
          placeholder="Search for a country..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="outline-none px-4 py-3 w-full max-w-md dark:bg-Blue-900 dark:text-White"
        />
      </div>

      <select
        value={region}
        onChange={onRegionChange}
        className="bg-White border border-White shadow-md rounded-md px-4 py-4 ml-4 dark:bg-Blue-900 dark:text-White dark:border-Blue-900"
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
