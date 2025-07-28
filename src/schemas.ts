import * as v from "valibot"

export const payload = v.strictObject({
  id: v.number(),
  email: v.pipe(v.string(), v.trim(), v.email()),
  exp: v.number(),
  iat: v.number(),
})

export type TokenPayload = v.InferOutput<typeof payload>
