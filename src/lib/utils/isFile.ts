export function isFile (filename: string): boolean {
  return (/\.(md)$/i).test(filename)
}
