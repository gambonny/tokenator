import { env, WorkerEntrypoint } from "cloudflare:workers"
import { createLogger, type Logger } from "@gambonny/cflo"
import { decode, verify } from "@tsndr/cloudflare-worker-jwt"
import { type TokenPayload, extractPayload } from "@/schemas"

const logger = createLogger({
  level: env.LOG_LEVEL,
  format: env.LOG_FORMAT,
})

export class TokenVerifier extends WorkerEntrypoint {
  env: Env
  logger: Logger

  constructor(env: Env, ctx: ExecutionContext) {
    super(ctx, env)
    this.env = env
    this.logger = logger
  }

  async decodeToken(token: string): Promise<TokenPayload | false> {
    if (!env.JWT_TOKEN) {
      this.logger.error("JWT_TOKEN not present")
      return false
    }

    try {
      await verify(token, env.JWT_TOKEN)
    } catch (e: unknown) {
      this.logger.warn("Token verification failed", { error: String(e) })
      return false
    }

    const { success, output, issues } = extractPayload(decode(token).payload)

    if (success) {
      this.logger.info("Token verified")
      return output
    }

    this.logger.error("Token invalid", issues)
    return false
  }
}
