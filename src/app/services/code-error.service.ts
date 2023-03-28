import { Injectable } from '@angular/core';
import { FirebaseCodeEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class CodeErrorService {

  constructor() { }

  codeError(code: string){

    switch(code){
      //el correo ya existe
      case FirebaseCodeEnum.EmailAlreadyInUse:
        return 'El usuario ya existe'

        //la contraseña es muy corta
      case FirebaseCodeEnum.WeakPassword:
        return 'La contraseña es muy debil'

        //correo invalido
      case FirebaseCodeEnum.InvalidEmail:
        return 'Correo invalido'

        //contraseña incorrecta
      case FirebaseCodeEnum.WrongPassword:
        return 'contraseña incorrecta'

        //usuario no encontrado
      case FirebaseCodeEnum.UserNotFound:
        return 'el usuario no existe'

        //error por defecto
      default: return 'error desconocido'
    }
  }
}
