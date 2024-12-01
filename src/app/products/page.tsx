// import React from "react";
// import FetchProductClient from "./FetchProductClient";
// import { Suspense } from "react";

// const ProductPage = () => {
//   return (
//     <div className="px-4 ">
//       <Suspense fallback={<p>Loading...</p>}>
//         <h1 className="font-bold text-3xl text-center my-4">
//           Product for Client
//         </h1>
//         <FetchProductClient />
//       </Suspense>
//     </div>
//   );
// };

// export default ProductPage;

import React from "react";
import FetchProductClient from "./FetchProductClient";
import { Suspense } from "react";
import axios from "axios";

interface ProductPageProps {
  searchParams: { [key: string]: string };
}

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  // Extract search filters and pagination
  const searchTerm = searchParams.query || "";
  const published = searchParams.published || "";
  const author = searchParams.author || "";
  const page = searchParams.page || "1"; // Default to page 1

  // Fetch data based on filters and current page
  const res = await axios.get(
    `${baseURL}/api/product?query=${searchTerm}&published=${published}&author=${author}&page=${page}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    } // Fresh data for each request
  );

  if (res.status >= 400) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.data;
  console.log("data dr parent", data);

  return (
    <div className="px-4 ">
      <Suspense fallback={<p>Loading...</p>}>
        <h1 className="font-bold text-3xl text-center my-4">
          Product for Client
        </h1>
        <FetchProductClient
          data={data.products}
          totalpages={data.totalCount}
          searchTerm={searchTerm}
          published={published}
          author={author}
        />
      </Suspense>
    </div>
  );
};

export default ProductPage;
