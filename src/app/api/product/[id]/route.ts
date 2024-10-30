import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const req = await request.json();
    console.log("requstnya updatee id nya: ", req);
    const ProductUpdate = await prisma.post.update({
      where: { id: req.id },
      data: {
        title: req.title,
        content: req.content,
        published: req.published,
        authorId: req.authorId,
      },
    });
    return NextResponse.json(ProductUpdate);
  } catch (error) {
    console.error("Error Updateting product:", error);
    return NextResponse.json(
      { error: "faild updating product" },
      { status: 500 }
    );
  }
}
// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: number } }
// ) {
//   const productId = params.id;
//   console.log("requstnya delete: ", productId);
//   try {
//     const Productdelete = await prisma.post.delete({
//       where: { id: productId },
//     });
//     return NextResponse.json(Productdelete);
//   } catch (error) {
//     console.error("Error delete product:", error);
//     return NextResponse.json(
//       { error: "faild delete product" },
//       { status: 500 }
//     );
//   }
// }
export async function DELETE(request: Request) {
  const req = await request.json();
  const productId = req.id;
  console.log("requstnya delete: ", productId);
  try {
    const Productdelete = await prisma.post.delete({
      where: { id: productId },
    });
    return NextResponse.json(Productdelete);
  } catch (error) {
    console.error("Error delete product:", error);
    return NextResponse.json(
      { error: "faild delete product" },
      { status: 500 }
    );
  }
}
