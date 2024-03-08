import { createYupSchema } from 'fastify-yup-schema';

export const createUserSchema = createYupSchema((yup) => ({
    body: yup
        .object()
        .shape({
            email: yup.string().email().min(6).max(36).required(),
            password: yup.string().min(6).max(32).required(),
            birthday: yup.date().max(new Date()).required(),
        })
        .noUnknown(),
}));
