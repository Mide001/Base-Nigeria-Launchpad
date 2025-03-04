import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  country: z.string().min(2, "Country is required"),
  logo: z.string({
    required_error: "Product logo is required",
    invalid_type_error: "Product logo must be a valid image",
  }),
  website: z.string().url("Invalid website URL").optional().nullable(),
  twitter: z.string().url("Invalid Twitter URL").optional().nullable(),
  github: z.string()
    .refine(val => val === '' || val.startsWith('http'), {
      message: "Invalid GitHub URL"
    })
    .optional()
    .nullable(),
});

export type ProductSubmission = z.infer<typeof ProductSchema>; 