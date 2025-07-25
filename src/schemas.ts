import * as v from "valibot"

export const payload = v.strictObject({
  id: v.string(),
  email: v.pipe(v.string(), v.trim(), v.email()),
  exp: v.number(),
})

export type TokenPayload = v.InferOutput<typeof payload>
