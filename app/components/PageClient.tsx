"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function PageClient() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <div className="">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-White dark:bg-gray-700 text-sm font-semibold dark:text-white transition-colors cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle dark mode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 256 256"
              className="fill-black dark:fill-white"
            >
              <g transform="translate(1.4 1.4) scale(2.81 2.81)">
                <path d="M 89.634 59.683 c -0.338 -0.276 -0.816 -0.302 -1.184 -0.062 c -16.514 10.864 -38.661 8.589 -52.661 -5.41 C 21.79 40.212 19.515 18.065 30.38 1.551 c 0.24 -0.366 0.215 -0.845 -0.062 -1.183 c -0.277 -0.339 -0.741 -0.46 -1.148 -0.294 c -5.826 2.349 -11.048 5.809 -15.523 10.283 c -18.195 18.195 -18.195 47.802 0 65.997 C 22.744 85.451 34.695 90 46.645 90 c 11.951 0 23.901 -4.549 32.999 -13.646 c 4.475 -4.476 7.935 -9.699 10.284 -15.523 C 90.091 60.425 89.972 59.96 89.634 59.683 z" />
              </g>
            </svg>
            <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
          </button>
    </div>
  );
}