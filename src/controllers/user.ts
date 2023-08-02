import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export const newUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ where: { username: username } });

    if(user) {
       return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Guardarmos usuario en la base de datos
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    // Extrae el encabezado de autorización
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({
            msg: "Error de Autenticación"
        });
    }

    // Decodifica el encabezado de autorización
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');

    // Validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({ where: { username: username } });

    if(!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no existe`
        });
    }

    // Validamos password
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        });
    }


    // Crea y firma el token
    // Construye la ruta al archivo
    const keyPath = path.join(__dirname, '..', 'keys', 'pvOpv.pem');

    // Lee la clave privada desde el archivo
    const privateKey = fs.readFileSync(keyPath, 'utf8');

    const token = jwt.sign(
        { 
            username: username 
        },
            privateKey,
        { 
            algorithm: 'RS256',
            expiresIn: '24h'
        }  // Especifica que quieres usar el algoritmo RS256
    );

    res.json(token);
}