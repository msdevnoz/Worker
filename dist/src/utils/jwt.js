import jwt from "jsonwebtoken";
class JsonWebToken {
    sign(payload) {
        return jwt.sign(payload, process.env.JWT_KEY);
    }
    verify(token) {
        try {
            return jwt.verify(token, process.env.JWT_KEY);
        }
        catch (err) {
            return null;
        }
    }
}
export const jwtHelper = new JsonWebToken();
