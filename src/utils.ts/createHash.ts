import bcrypt from 'bcrypt';

export const createHash = async (password: string) => {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
