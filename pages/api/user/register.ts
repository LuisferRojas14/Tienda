import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { User } from '../../../models'
import { db } from '../../../database'
import { jwt } from '../../../utils'
import { validations } from '../../../utils'

type Data = 
| {message: string}
| {token: string;
   user: {
       email: string, 
       name: string
       role: string, 
       }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
   case 'POST':
     return registerUser(req, res)
    default:
        res.status(400).json({ message: 'Metodo no soportado' })
}
}
const registerUser =async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email= '',password ='', name=''} = req.body as {email: string, password: string, name: string};

   
    if (password.length < 6) {
        return res.status(400).json({message: 'La contraseña debe tener al menos 6 caracteres'})
    }
    if (name.length < 3) {
        return res.status(400).json({message: 'El nombre debe tener al menos 3 caracteres'});
    }
    // TODO: Validar que el email sea un email
    if (!validations.isValidEmail(email) ){
        return res.status(400).json({message: 'El email no es valido'});
    }

    await db.connect();
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: 'El usuario ya existe'});
    }
     const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role:'client',
        name,
    });
    try{
        await newUser.save({validateBeforeSave: true});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: 'Revisar logs del servidor'});
    }

   const {_id,role} = newUser;
   const token = jwt.signToken(_id, email);

  return res.status(200).json({
        token,
        user: {
            email,
            role,
             name,
          }
        })
}

