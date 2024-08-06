import { Request } from "express";

export interface AuthenticateRequest extends Request {
    decodedUser?: {
        email: string;
    };
}
