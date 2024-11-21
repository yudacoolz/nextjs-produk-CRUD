"use client";

import { useProductContext } from "@/contexts/ProductContext";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function PaginationComponent(props: {
  query: string;
  published: string;
  author: string;
  totalPages: number;
}) {
  // export default function Pagination() {
  const { fetchFilteredProduct } = useProductContext();
  const { query, published, author, totalPages } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  console.log("currentPage", currentPage);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: string) => {
    fetchFilteredProduct(query, published, author, pageNumber);
  };

  const nextpage = () => {
    fetchFilteredProduct(
      query,
      published,
      author,
      (currentPage + 1).toString()
    );
    console.log("nextpage", currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 md:mt-8 mt-16">
      <button
        className="py-2 px-4 bg-black text-white rounded font-bold"
        onClick={() => handlePageChange((currentPage - 1).toString())}
        disabled={currentPage <= 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="1x" />
      </button>

      {/* Map over pages and create links */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <Link
            key={page}
            href={createPageURL(page)}
            onClick={() => handlePageChange(page.toString())}
            className={`border py-2 px-4 rounded ${
              page === currentPage ? "bg-slate-700 text-white" : ""
            }`}
          >
            {page}
          </Link>
        );
      })}
      <button
        className="py-2 px-4 bg-black text-white rounded"
        // onClick={() => handlePageChange((currentPage + 1).toString())}
        onClick={() => nextpage()}
        disabled={currentPage >= totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} size="1x" />
      </button>
    </div>
  );
}
