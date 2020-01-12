import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginSuccess = false;
  loginFormSubmitted = false;
  loginForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService , private router: Router) { }

  ngOnInit() {
  
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });    
  
  }

  Login(){
    this.loginFormSubmitted = true;
    var username : string = this.loginForm.controls.username.value  
    var password : string = this.loginForm.controls.password.value  
    this.apiService.userLogin(username, password).subscribe(data => {
      if(data)
        this.router.navigate(['/Profile']);
      else
        this.loginSuccess = false; 
     },
        error => {console.log(error)}
     
     );



  }

}
