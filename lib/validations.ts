import { z } from 'zod';

export const caseSchema = z.object({
  caseNumber: z.string().min(1, 'Case number is required'),
  caseType: z.enum(['civil', 'criminal', 'family', 'property', 'other'], {
    message: 'Please select a valid case type'
  }),
  courtName: z.string().min(1, 'Court name is required'),
  clientId: z.string().min(1, 'Please select a client'),
  opposingParty: z.string().min(1, 'Opposing party is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'ongoing', 'adjourned', 'won', 'lost', 'closed'], {
    message: 'Please select a valid status'
  })
});

export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(11, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  address: z.string().optional(),
  caseType: z.enum(['civil', 'criminal', 'family', 'property', 'other'])
});

export const attorneySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  barId: z.string().min(1, 'Bar ID is required'),
  phone: z.string().min(11, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  specialization: z.string().optional()
});

export const hearingSchema = z.object({
  caseId: z.string().min(1),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  purpose: z.string().min(1, 'Purpose is required'),
  notes: z.string().optional(),
  nextHearingDate: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(11, 'Please enter a valid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });
