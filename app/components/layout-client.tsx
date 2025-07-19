'use client';

import {  useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);

   useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || 'light');
  }, [theme]);
  
  return <>{children}</>;
}