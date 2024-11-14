import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

interface SearchFilter {
  title: string;
  placeholder: string;
  isDashboard: boolean;
  // onSearch: (query: string) => void;
}

export const SearchFilter = ({
  title,
  placeholder,
  isDashboard,
}: SearchFilter) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState<string>("");
  const [published, setPublished] = useState<boolean>(true);
  const [author, setAuthor] = useState<number>(1);

  const handleSearch: (term: string) => void = useDebouncedCallback(
    (term: string) => {
      console.log(`Searching... ${term}`);
      // URLSearchParams  utk manipulasi URL =  ?page=1&query=a
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      params.set("page", "1");

      // Now that you have the query string. You can use Next.js's useRouter and usePathname hooks to update the URL.
      replace(`${pathname}?${params.toString()}`);
    },
    900
  );
  console.log("published nya opo", published);

  const handleSearchDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }

    params.set("published", published.toString());
    if (author) params.set("author", author.toString());
    params.set("page", "1");

    console.log("Final Query String:", params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <p>{title}</p>
      <div className=" flex gap-3">
        {isDashboard ? (
          <form
            className="flex gap-2 items-center"
            onSubmit={handleSearchDashboard}
          >
            <label htmlFor="search" className="text-black">
              Search
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder={placeholder}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              defaultValue={searchParams.get("query")?.toString()}
            />

            <select
              name="published"
              id="published"
              value={published ? "true" : "false"} // Bind the value of the select to authorId state
              onChange={(e) => setPublished(e.target.value === "true")} // Update the state on change
            >
              <option value="true">published</option>
              <option value="false">not published</option>
            </select>

            <select
              name="author"
              id="author"
              value={author} // Bind the value of the select to authorId state
              onChange={(e) => setAuthor(Number(e.target.value))} // Update the state on change
            >
              <option value="1">Admin</option>
              <option value="2">Staff</option>
            </select>

            <button
              type="submit"
              className="p-2 bg-black rounded-md text-white"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="flex gap-2">
            <label htmlFor="search" className="text-black">
              Search
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder={placeholder}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFilter;