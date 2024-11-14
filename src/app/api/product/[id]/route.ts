import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.post.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: { author: true }, // Include author data in the response
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the product" },
      { status: 500 }
    );
  }
}

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
        ImageUrl: req.ImageUrl,
      },
    });
    return NextResponse.json(ProductUpdate);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating product:", error.message);
      return NextResponse.json(
        { error: "Failed updating product", details: error.message },
        { status: 500 }
      );
    } else {
      // Handle case where error is not an instance of Error (rare)
      console.error("Unknown error updating product:", error);
      return NextResponse.json(
        { error: "Failed updating product", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}

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
