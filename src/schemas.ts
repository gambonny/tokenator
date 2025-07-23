import * as v from "valibot"
import { extract } from "@/lib/valibot"

const tokenPayloadSchema = v.object({
  id: v.string(),
  email: v.pipe(v.string(), v.trim(), v.email()),
  exp: v.number(),
})

export function extractPayload(maybePayload: unknown) {
  return extract(tokenPayloadSchema, maybePayload)
}

export type TokenPayload = v.InferOutput<typeof tokenPayloadSchema>
