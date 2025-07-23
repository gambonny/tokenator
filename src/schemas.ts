import * as v from "valibot"

function extract<TSchema extends v.BaseSchema<any, any, any>>(
  schema: TSchema,
  input: unknown,
):
  | { success: true; output: v.InferOutput<TSchema>; issues: undefined }
  | {
      success: false
      output: undefined
      issues: ReturnType<typeof v.flatten>["nested"]
    } {
  const result = v.safeParse(schema, input)

  if (result.success) {
    return { success: true, output: result.output, issues: undefined }
  }

  return {
    success: false,
    output: undefined,
    issues: v.flatten(result.issues).nested,
  }
}

const tokenPayloadSchema = v.object({
  id: v.string(),
  email: v.pipe(v.string(), v.trim(), v.email()),
  exp: v.number(),
})

export function extractPayload(maybePayload: unknown) {
  return extract(tokenPayloadSchema, maybePayload)
}

export type TokenPayload = v.InferOutput<typeof tokenPayloadSchema>
