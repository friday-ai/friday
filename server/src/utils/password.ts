import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function hash(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function compare(password: string, password_hash: string): Promise<boolean> {
  return bcrypt.compare(password, password_hash);
}

export {
  hash,
  compare
};
