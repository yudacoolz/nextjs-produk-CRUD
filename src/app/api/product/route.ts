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
import { PrismaClient } from "@prisma/client";
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
export async function GET() {
  const products = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { author: true }, // Include author data in the response
  });
  return NextResponse.json(products);
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
