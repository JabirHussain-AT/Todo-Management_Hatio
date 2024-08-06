import jwt from 'jsonwebtoken'


export const generateToken = ( payload : { email : string  } )  => {

    return jwt.sign(payload, process.env.JWT_SECRET! , { expiresIn: '20d' });
    
};