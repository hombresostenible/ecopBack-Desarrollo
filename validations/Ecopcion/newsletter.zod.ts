import { z, ZodObject, ZodString, ZodBoolean } from 'zod';

type NewsletterSchemaType = ZodObject<{
    email: ZodString;
}>;

export const newsletterSchema: NewsletterSchemaType = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Email is not valid',
    }),
});
