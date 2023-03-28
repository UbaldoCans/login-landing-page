import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/services/code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recuperarPassword: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private router: Router,
              private firebaseError: CodeErrorService
  ){
    this.recuperarPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  recuperar(){
    const correo = this.recuperarPassword.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(correo).then(() =>{
      this.toastr.info('revisa tu bandeja de entrada y sigue el link para restablecer tu contraseña', 'recuperar password')
      this.router.navigate(['/login'])

    }).catch((error) =>{
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code),'Error')
    })
  }

}
