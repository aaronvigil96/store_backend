import * as bcrypt from "bcrypt";

const SALT_ROUND = 10;

export const hashPassword = (password: string):string => {
    return bcrypt.hashSync(password, SALT_ROUND);
}

export const comparePassword = (password:string, hash:string):boolean => {
    return bcrypt.compareSync(password, hash);
}