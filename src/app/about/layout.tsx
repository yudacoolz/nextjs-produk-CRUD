"use client";

// import { useDarkTheme } from "@/contexts/DarkThemeContext";

export default function LayoutAbout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isDark, setIsDark } = useDarkTheme(); // Using isDark and setIsDark consistently

  // const handleDarkButton = () => {
  //   setIsDark(!isDark);
  // };

  return (
    <>
      {/* <div
        className={`w-full text-white p-2 flex justify-between ${
          isDark ? "bg-slate-700" : "bg-green-700"
        }`}
      >
        <p> About Heeadeeer Layout </p>
        <button
          className="bg-blue-700 p-2 rounded-lg text-white"
          onClick={handleDarkButton}
        >
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div> */}
      {children}
      {/* <div className={`w-full p-2 ${isDark ? "bg-slate-700" : "bg-green-700"}`}>
        About Footer Layout
      </div> */}
    </>
  );
}
