export function preventInvalidExit(errorText: string) {
  /**
   * In this function we can configure errors so we have a better control over them
   */
  throw new Error(errorText);
}
