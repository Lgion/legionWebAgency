import { z } from 'zod';

export const ServiceSchema = z.object({
  slug: z.string().min(2).max(100),
  name: z.string().min(2).max(150),
  category: z.string().min(2).max(100),
  price: z.number().int().nonnegative(),
  priceFrom: z.boolean().optional(),
  duration: z.number().int().positive().optional(),
  description: z.string().min(5).max(1000),
});

export const OrderItemSchema = z.object({
  slug: z.string(),
  quantity: z.number().int().positive(),
});

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1),
  customer: z.object({
    name: z.string().min(2).max(100),
    phone: z.string().min(8).max(20),
    email: z.string().email().optional(),
  }),
  delivery: z.object({
    mode: z.enum(['pickup', 'delivery']),
    address: z.string().max(250).optional(),
    notes: z.string().max(500).optional(),
  }),
  paymentMethod: z.enum(['wave', 'paydunya', 'whatsapp', 'cash']),
});

export const ContactMessageSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional(),
  message: z.string().min(5).max(1000),
});
