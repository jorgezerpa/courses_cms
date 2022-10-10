import bcrypt from 'bcryptjs'

const encrypt = {
  hashPassword: async function(password:string) {
    const hash = await bcrypt.hash(password, 10);
    return hash
  },
  compare: async function(password:string, hashedPassword:string) {
    const isMatch = await bcrypt.compare(password,hashedPassword);
    return isMatch
  }
}

export default encrypt
