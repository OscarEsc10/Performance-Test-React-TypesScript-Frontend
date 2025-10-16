import { z } from "zod";

// ================================
// Product Form Validation Schema
// ================================
export const productSchema = z.object({
  sku: z
    .string()
    .min(1, { message: "SKU is required" })
    .max(30, { message: "SKU too long" })
    .regex(/^[A-Za-z0-9_-]+$/, { message: "Only letters, numbers, - and _ allowed" }),

  name: z.string().min(3, { message: "Name must have at least 3 characters" }),
  brand: z.string().min(2, { message: "Brand is required" }),

  quantity: z.coerce
    .number()
    .int({ message: "Must be an integer" })
    .nonnegative({ message: "Quantity cannot be negative" }),

  price: z.coerce
    .number()
    .positive({ message: "Price must be greater than zero" }),

  category: z.string().optional(),
  imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;


// ================================
// User Form Validation Schema
// ================================
export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(30, "Username too long"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .optional(),
  role: z.enum(["admin", "user"]).default("user"),
  isActive: z.boolean().default(true),
});

// Type of typescript
export type UserFormValues = z.infer<typeof userSchema>;
