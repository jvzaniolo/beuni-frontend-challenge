export function classNames(
  ...classes: (string | boolean | null | undefined)[]
) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Tries get a string error message from an unknown error.
 */
export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }
  return 'Erro desconhecido'
}

/**
 * Provide a condition and if that condition is falsey, throws a 400
 * Response with the given message.
 *
 * inspired by invariant from 'tiny-invariant'
 *
 * @example
 * invariantResponse(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Response} if condition is falsey
 */
export function invariantResponse(
  condition: any,
  message?: string | (() => string),
  responseInit?: ResponseInit,
): asserts condition {
  if (!condition) {
    throw new Response(
      typeof message === 'function'
        ? message()
        : message ||
          'An invariant failed, please provide a message to explain why.',
      { status: 400, ...responseInit },
    )
  }
}
