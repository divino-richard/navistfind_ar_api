import { Errors } from "../constants";
import { prisma } from "../lib/db";
import { CreateAnchorInput, UpdateAnchorInput } from "../schemas/anchor.schema";

export const createAnchor = async (data: CreateAnchorInput) => {
  const existingAnchor = await prisma.anchor.findFirst({
    where: {
      anchorId: data.anchorId,
    },
  });

  if (existingAnchor) {
    throw Errors.conflict("Anchor already exists");
  }

  return await prisma.anchor.create({
    data,
  });
};

export const getAnchors = async () => {
  return await prisma.anchor.findMany(); // we're not expecting large data atm
};

export const updateAnchor = async (id: string, data: UpdateAnchorInput) => {
  const anchor = await prisma.anchor.findUnique({
    where: {
      id,
    },
  });

  if (!anchor) {
    throw Errors.notFound("Anchor not found");
  }

  return await prisma.anchor.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteAnchor = async (id: string) => {
  const anchor = await prisma.anchor.findUnique({
    where: {
      id,
    },
  });

  if (!anchor) {
    throw Errors.notFound("Anchor not found");
  }

  return await prisma.anchor.delete({
    where: {
      id,
    },
  });
};
