import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  style={
    border:"2px solid red"
  }

  
  ngOnInit(): void {
  }

  form : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]) ,
    type:new FormControl('', [Validators.required])

  });

  goHome(){
    console.log(this.form)
    this.loginService.checkUser(this.form).subscribe((res: any) => {
      let oldHref= window.location.href;
      let newHref = oldHref.replace("Login","Home");
      window.location.href = newHref;
      localStorage.setItem('userData',JSON.stringify(this.form.value));
    });
  }
}
