import { pbkdf2Sync, randomBytes } from 'crypto';

function hash(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const passwordHash = pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return `${passwordHash}.${salt}`;
}

function compare(password: string, passwordHash: string): boolean {
  const [hashedPassword, salt] = passwordHash.split('.');
  const newHash = pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return newHash === hashedPassword;
}

export { compare, hash };
