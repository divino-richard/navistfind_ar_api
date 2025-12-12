import { z } from "zod";

export const createAnchorSchema = z.object({
  body: z.object({
    anchorId: z.string().trim().min(1, { message: "Required" }),
    latitude: z.number(),
    longitude: z.number(),
    altitude: z.number(),
    title: z.string().trim().min(1, { message: "Required" }),
    description: z.string().trim().min(1, { message: "Required" }),
  }),
});

export const updateAnchorSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    latitude: z.number(),
    longitude: z.number(),
    altitude: z.number(),
    title: z.string().trim().min(1, { message: "Required" }),
    description: z.string().trim().min(1, { message: "Required" }),
  }),
});

export const deleteAnchorSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateAnchorInput = z.infer<typeof createAnchorSchema>["body"];
export type UpdateAnchorInput = z.infer<typeof updateAnchorSchema>["body"];
