import { FastifyInstance, FastifyReply } from 'fastify';

export default async function router(router: FastifyInstance) {
    router.get('/health', (_, reply: FastifyReply) => {
        reply.status(200).send({
            data: {
                status: 'ok',
            },
        });
    });
}
