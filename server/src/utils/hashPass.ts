import bcrypt from "bcrypt";


export const hashPassword = async (password: string) => {

    let SALT: number =  Number(process.env.HASH_SALT) ;
    let hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
    
};