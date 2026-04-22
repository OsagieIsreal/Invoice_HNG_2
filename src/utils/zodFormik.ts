// Lightweight Zod -> Formik validation adapter.
// Returns a function suitable for Formik's `validate` prop.
import type { ZodSchema } from "zod";

export const toFormikValidate =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T,>(schema: ZodSchema<T>) => (values: T): Record<string, any> => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: Record<string, any> = {};
    for (const issue of result.error.issues) {
      let cursor = errors;
      for (let i = 0; i < issue.path.length; i++) {
        const key = issue.path[i] as string | number;
        const isLast = i === issue.path.length - 1;
        if (isLast) {
          cursor[key] = issue.message;
        } else {
          const nextKey = issue.path[i + 1];
          if (cursor[key] == null) {
            cursor[key] = typeof nextKey === "number" ? [] : {};
          }
          cursor = cursor[key];
        }
      }
    }
    return errors;
  };

// Backwards-compat alias (old name).
export const toFormikValidationSchema = toFormikValidate;
