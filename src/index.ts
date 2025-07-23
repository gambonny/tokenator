import { createLogger, type Logger } from "@gambonny/cflo"
import { env, WorkerEntrypoint } from "cloudflare:workers"

const logger = createLogger({
  level: env.LOG_LEVEL,
  format: env.LOG_FORMAT,
})

export class TKNVLDTR extends WorkerEntrypoint {
  env: Env
  logger: Logger

  constructor(env: Env, ctx: ExecutionContext) {
    super(ctx, env)
    this.env = env
    this.logger = logger
  }
}
