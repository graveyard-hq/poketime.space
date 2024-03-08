import { z } from 'zod';

const userModel = z
    .object({
        username: z.string().min(2).max(32).trim(),
        email: z.string().email().min(6).max(32).trim(),
        password: z.string().min(6).max(32).trim(),
    })
    .strict();

const UserBadge = z.enum(['premium', 'supreme']);
type UserBadges = z.infer<typeof UserBadge>[];

export { userModel, UserBadges };
