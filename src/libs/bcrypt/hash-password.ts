import bcrypt from 'bcryptjs'

export async function hashPassword(password:string) {
  const hash = await bcrypt.hash(password, 10);
  return hash
}
