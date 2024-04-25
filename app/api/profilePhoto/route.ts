import prisma from "../../../prisma/lib/prisma";

export async function POST(req: Request) {
  const { id, url } = await req.json();

  await prisma.user.update({
    where: {
      id: id
    },
    data: {
      profilePhoto: url
    }
  });
}
