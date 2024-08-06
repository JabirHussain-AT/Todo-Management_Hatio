import mongoose, { Schema, Document } from 'mongoose';
import { IOtp } from '../interface/IOtp';


const otpSchema: Schema = new Schema({
    email: {
        type: String,
        unique : true,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // Set the expiration time to 5 minutes (in seconds)
    },
});

export default mongoose.model<IOtp & Document>('Otp', otpSchema);


export interface IOtpDoc {
    email : string,
    otp : number ,
    createdAt :Date ,
}