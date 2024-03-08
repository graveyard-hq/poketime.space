import Fastify, { FastifyInstance } from 'fastify';
import { fastifyYupSchema } from 'fastify-yup-schema';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifyEtag from '@fastify/etag';
import fastifyAuth from '@fastify/auth';
import rawbody from 'fastify-raw-body';
import fastifyMultipart from '@fastify/multipart';

import router from './main.router';

import { randId } from './utils/id';
import { redis } from './utils/redis';
import { loggerConfig } from './utils/log';

const buildServer = (): FastifyInstance => {
    const app: FastifyInstance = Fastify({
        trustProxy: true,
        logger: loggerConfig,
        genReqId() {
            return randId('req', 32);
        },
    });

    app.register(helmet);
    app.register(cors, { origin: process.env.ORIGIN });
    app.register(fastifyEtag);
    app.register(fastifyMultipart, {
        attachFieldsToBody: true,
        limits: {
            fileSize: 100 * 1024 * 1024,
        },
    });
    app.register(rateLimit, {
        global: true,
        max: 100,
        ban: 101,
        timeWindow: '1 second',
        redis: redis,
        nameSpace: 'rate-limit',
        errorResponseBuilder: function (request, context) {
            return {
                statusCode: 429,
                message: `Rate limit exceeded, retry in ${context.after}`,
            };
        },
    });
    app.register(rawbody, {
        field: 'rawBody',
        global: false,
        encoding: 'utf8',
        runFirst: true,
        routes: [],
    });
    app.register(fastifyAuth);
    app.register(fastifyYupSchema);

    app.setNotFoundHandler(function (request, reply) {
        return reply.code(404).send({
            error: {
                message: `Unrecognized request URL (${request.method}: ${request.url}).`,
                type: 'invalid_request_error',
            },
        });
    });

    app.setErrorHandler(function (error: any, _, reply) {
        if (error.statusCode === 400) {
            error.type = 'invalid_request_error';
        }
        return reply.status(error.statusCode as number).send({
            error: {
                message: error.message,
                type: error.type || 'api_error',
            },
        });
    });

    app.addHook('onSend', async (request: any, reply, payload) => {
        reply.header('X-Request-ID', request.id);

        return payload;
    });

    app.register(router);

    return app;
};

export default buildServer;
