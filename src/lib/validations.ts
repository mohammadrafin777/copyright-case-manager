import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const caseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  caseNumber: z.string().min(1, 'Case number is required'),
  clientName: z.string().min(1, 'Client name is required'),
  type: z.string().min(1, 'Case type is required'),
  status: z.enum(['active', 'pending', 'closed']),
  description: z.string().optional()
});

export const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal(''))
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CaseInput = z.infer<typeof caseSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
