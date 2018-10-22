/**
 * Wrapper to setTimeout, that returns a Promise
 */
export function timeout$(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
