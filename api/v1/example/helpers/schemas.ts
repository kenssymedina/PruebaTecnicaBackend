import { z } from 'zod';

export const validateLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const validateAssuranceSchema = z.object({
  gender: z.string().max(1),
  smoke: z.boolean(),
  insuredAmount: z.number().min(0),
  age: z.number().gte(18),
});
