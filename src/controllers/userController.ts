import { Request, Response } from 'express';
import { userServices } from '../services/userServices.js';
import { authentication, random } from '../helper/authentication.helper.js';

// export const register = (req:Request, res: Response ) => {
//     try {
//         const { password, name, email } = req.body;
//         if (!password || !name || !email) {
//             return res.status(500).json({ error: 'invalid params' }).end();
//         }
//         const userExist = userServices.getUserByEmail(email);
//         if (userExist) {
//             return res.status(500).json({ error: 'userExist' }).end();
//         }
//         const salt = random();
//         const newUser = userServices.createUser({
//             email,
//             name,
//             authentication: {
//                 salt,
//                 password: authentication(salt, password),
//             }
//         });
        
//         return res.status(200).json(newUser).end();

//     } catch (error) {
//         return res.status(500).json({ error: 'kjsdnjvk' }).end();  
//     }
// }


export const register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
  
      if (!email || !password || !name) {
        return res.sendStatus(400);
      }
  
      const existingUser = await userServices.getUserByEmail(email);
    
      if (existingUser) {
        return res.sendStatus(400);
      }
  
      const salt = random();
      const user = await userServices.createUser({
        email,
        name,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
      });
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
}
  
export const getAllUser = async (req: Request, res: Response) => { 
    try {
        const users = await userServices.getAllUsers();
        return res.status(200).json({ data: users });
    } catch (error) {
        return res.status(500).json({ error }).end();   
    }   
}

