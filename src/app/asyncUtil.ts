/**
 * Wrapper to setTimeout, that returns a Promise
 * @param ms
 */
export function timeout$(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
