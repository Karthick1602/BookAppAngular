import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse } from 'src/app/shared/model/login-response.mode';
import { Login } from 'src/app/shared/model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
    
  ) { }
  ngOnInit(){
    sessionStorage.clear();
  }
  get username() {
    return this.loginForm.controls['username'];
  }
  get password() { return this.loginForm.controls['password']; }
  
  loginUser() {
   
    const { username, password } = this.loginForm.value;
    let userLogin = new Login(username as string,password as string);
    
    this.authService.getUserByEmail(userLogin).subscribe(
      (response:LoginResponse )=> {
        console.log("Login is successfull", response);
        
        

        sessionStorage.setItem('username', username as string);
        sessionStorage.setItem('loggedIn', "true");
        if(response.roles[0].match("ADMIN")){
          sessionStorage.setItem("isAdmin","true");
        }else{
          sessionStorage.setItem('isUser','true');
        }
        this.router.navigate(['/home']);
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }

    )
  }
}
