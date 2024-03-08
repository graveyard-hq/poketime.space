import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../config/config';

class JwtUtil {
    private static secretKey: string = CONSTANTS.JWT_SECRET_KEY;
    private static jwtIssuer: string = CONSTANTS.JWT_ISSUER;

    public async generateJwtToken(payload: object, expiresIn: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                JwtUtil.secretKey,
                { expiresIn: expiresIn, issuer: JwtUtil.jwtIssuer },
                (error, token: any) => {
                    if (error) {
                        reject(new Error(error as any));
                    } else {
                        resolve(token);
                    }
                },
            );
        });
    }

    public async verifyJwtToken(token: string): Promise<any> {
        return jwt.verify(token, JwtUtil.secretKey, { issuer: JwtUtil.jwtIssuer });
    }
}

const jwtUtil = new JwtUtil();

export { jwtUtil };
