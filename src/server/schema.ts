import z from "zod";

export const HelloPayloadSchema = z.object({
  message: z.string(),
});
export type HelloPayloadSchema = z.infer<typeof HelloPayloadSchema>;
