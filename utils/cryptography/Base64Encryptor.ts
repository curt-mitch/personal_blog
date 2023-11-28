import { createHash } from 'crypto';

export default function encryptBase64String(base64String: string): string {
  const buffer = Buffer.from(base64String, 'base64');
  const hash = createHash('sha256');

  hash.update(buffer);
  return hash.digest('hex');
}
