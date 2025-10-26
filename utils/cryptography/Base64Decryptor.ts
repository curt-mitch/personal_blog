import { createHash } from 'crypto';

export default function decryptBase64String(EncryptedString: string): string {
  const buffer = Buffer.from(EncryptedString, 'base64');
  const hash = createHash('sha256');

  hash.update(buffer);
  return hash.digest('hex');
}
