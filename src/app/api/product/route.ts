// import type { Post } from "@prisma/client/edge";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function fetchProduct(): Promise<Post[]> {
//   return await prisma.post.findMany({
//     orderBy: [
//       {
//         updatedAt: "desc",
//       },
//     ],
//     include: {
//       author: true, // This includes the author's information in each post
//     },
//   });
// }

// route.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function fetchProduct() {
//   return await prisma.post.findMany({
//     orderBy: [
//       {
//         updatedAt: "desc",
//       },
//     ],
//     include: {
//       author: true, // This includes the author's information in each post
//     },
//   });
// }

// export async function createProduct(req: Request) {
//   const data = await req.json();

//   const product = await prisma.post.create({
//     data: {
//       title: data.title,
//       content: data.content,
//       published: data.published,
//       authorId: data.authorId,
//     },
//   });
//   return NextResponse.json(product);
// }

// src/app/api/product/route.ts

// GET request handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const publishedParams = searchParams.get("published");
  const published =
    publishedParams === "true"
      ? true
      : publishedParams === "false"
      ? false
      : undefined;

  const author = searchParams.get("author");
  const authorId = author ? parseInt(author) : undefined;

  // PAGINATION
  const page = parseInt(searchParams.get("page") || "1", 10); // Current page
  // const limit = parseInt(searchParams.get("limit") || "10", 10); // Items per page
  const limit = 4;
  const skip = (page - 1) * limit; // Offset for pagination

  const where: Prisma.PostWhereInput = {
    OR:
      // jika ada query dari search atau filter
      query
        ? [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ]
        : undefined,
    // published: published || undefined,
    // ...(published !== undefined && { published }),
    published: published,

    authorId: authorId || undefined,
  };

  // Log the `where` filter to inspect the query condition
  console.log("Filter applied in 'where' condition:", where);

  // Fetch the total count of items
  const totalCount = await prisma.post.count({ where });

  // Log the `totalCount` to check the total number of matched posts
  console.log("Total count of posts matching filter:", totalCount);
  const products = await prisma.post.findMany({
    skip,
    take: limit,
    where,

    // original nya cuma ini kalau tanpa search
    orderBy: { updatedAt: "desc" },
    include: { author: true }, // Include author data // Include author data in the response
  });
  return NextResponse.json({
    products,
    totalCount,
  });
}

// export async function POST(request: Request) {
//   const data = await request.json();

//   const product = await prisma.post.create({
//     data: {
//       title: data.title,
//       content: data.content,
//       published: data.published,
//       authorId: data.authorId,
//     },
//   });

//   return NextResponse.json(product);
// }

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const product = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        authorId: data.authorId,
        ImageUrl: data.ImageUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
