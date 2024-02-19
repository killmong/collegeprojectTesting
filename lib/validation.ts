import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must contain at least 5 character(s)" })
    .max(130),
  explanation: z
    .string()
    .min(20, { message: "It must contain at least 20 character(s)" }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
