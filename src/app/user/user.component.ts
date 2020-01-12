import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User;
  
  editMode:boolean = false;
  UserDetailsForm: FormGroup;

  userFormErrors : string;

  constructor(private apiService: ApiService,private formBuilder: FormBuilder, private router: Router) {
    this.UserDetailsForm = this.formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required, Validators.email],
      gender: [''],
      phoneNumber: [''],
      creditCardNumber: ['', Validators.required]
    });
   }

  ngOnInit() {

    this.apiService.getCurrentUserProfile().subscribe(data => {
      if(data == null || data.userId == null)
        this.router.navigate(['/Login']);
      this.user = data;
     },
        error => {console.log(error)}     
     );
  }

  EditUserDetails (){
    this.userFormErrors = '';
    this.UserDetailsForm = this.formBuilder.group({
      userId: [this.user.userId, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      emailAddress: [this.user.emailAddress, [Validators.required, Validators.email]],
      gender: [this.user.gender],
      phoneNumber: [this.user.phoneNumber],
      creditCardNumber: [this.user.creditCardNumber, Validators.required]
    });
    this.editMode = true;
  }
  ExitEditMode (){
    this.editMode = false;
  }

  UpdateUserDetails()
  {
    if (this.UserDetailsForm.invalid) {
      //this.userFormErrors = this.UserDetailsForm.getError();
      return;
    }
    var user = new User();
    user.userId = this.UserDetailsForm.controls.userId.value;
    user.firstName = this.UserDetailsForm.controls.firstName.value; 
    user.lastName = this.UserDetailsForm.controls.lastName.value; 
    user.emailAddress = this.UserDetailsForm.controls.emailAddress.value; 
    user.gender = this.UserDetailsForm.controls.gender.value; 
    user.phoneNumber = this.UserDetailsForm.controls.phoneNumber.value; 
    user.creditCardNumber = this.UserDetailsForm.controls.creditCardNumber.value; 
    
    this.apiService.updateUser(user).subscribe(data  => {
      this.user = data;
      this.editMode = false;
    },
    error=>{this.userFormErrors = error.message;console.log(error)}
    );
  }

}
