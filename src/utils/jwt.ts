import jwt, { JwtPayload } from "jsonwebtoken";

class JsonWebToken {
     sign(payload: string | object): string {
      return jwt.sign(payload, process.env.JWT_KEY as string)
     }
     verify(token:string){
     try {
       return jwt.verify(token,process.env.JWT_KEY as string)       
     } catch (err:any) {
        return null;
     }
     }
}

export const jwtHelper=new JsonWebToken();