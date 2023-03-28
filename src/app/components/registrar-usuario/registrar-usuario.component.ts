import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CodeErrorService } from 'src/app/services/code-error.service';


@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
   registrarUsuario: FormGroup;
   loading: boolean = false;

   constructor(private fb: FormBuilder,
               private afAuth: AngularFireAuth,
               private toastr: ToastrService,
               private router: Router,
               private firebaseError: CodeErrorService
               ) {
      this.registrarUsuario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required, Validators.minLength(8)],
        repeatPassword: ['', Validators.required]
      })
   }
   ngOnInit(): void{}

   registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repeatPassword = this.registrarUsuario.value.repeatPassword;

    if(password !== repeatPassword){
      this.toastr.error('las contraseñas no coinciden', 'error')
      return;
    }

    this.loading = true;
    this.afAuth
       .createUserWithEmailAndPassword(email, password)
       .then(() => {
       this.verificarCorreo();
    })
    .catch((error) =>{
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'error');
    })
   }
  verificarCorreo() {
     this.afAuth.currentUser
          .then(user => user?.sendEmailVerification())
          .then(() => {
            this.toastr.info(
              'Revise el correo electronico que le fue enviado para verificar ',
              'Verificación en proceso'
            );
            this.router.navigate(['/login']);
          });
  }
}




