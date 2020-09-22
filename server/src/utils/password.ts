import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function hash(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function compare(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export {
  hash,
  compare,
};
