import fastify from 'fastify'
import { userRoutes } from './modules/user/infra/userRoutes'
import { ZodError } from 'zod'
import { env } from './core/infra/env'

export const app = fastify()

app.register(userRoutes)
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO He we shold log to an external tool like Daao/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
