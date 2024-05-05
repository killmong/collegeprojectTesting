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

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(20, { message: "It must contain at least 20 character(s)" }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "It must contain at least 3 character(s)" })
    .max(50),
  username: z
    .string()
    .min(5, { message: "It must contain at least 5 character(s)" })
    .max(50),
  bio: z
    .string()
    .min(10, { message: "It must contain at least 10 character(s)" })
    .max(150),
  portfolioWebsite: z.string().url(),
  location: z
    .string()
    .min(3, { message: "It must contain at least 3 character(s)" })
    .max(50),
});
