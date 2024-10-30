// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();
// const SECRET = process.env.JWT_SECRET!;

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     const User = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     // tahap validasi email dan password
//     if (!User || (await bcrypt.compare(password, User.password))) {
//       return NextResponse.json(
//         { error: "Invalid Credential" },
//         { status: 401 }
//       );
//     }

//     // jika tahap validasi berhasil, lanjut ke tahap ...
//     const token = jwt.sign({ id: User.id }, SECRET, { expiresIn: "1h" });
//     return NextResponse.json(token);
//   } catch (error) {
//     console.error("Error Login :", error);
//     return NextResponse.json(
//       { error: "Failed to Login user" },
//       { status: 500 }
//     );
//   }
// }

// /api/auth/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log(email, password);

  const user = await prisma.user.findUnique({ where: { email } });

  // if (!user || !(await bcrypt.compare(password, user.password))) {
  //   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  // }

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  return NextResponse.json({ token });
}
