export default function convertToBase64(input: string): string {
  const encodedString = Buffer.from(input).toString('base64');
  return encodedString;
}
