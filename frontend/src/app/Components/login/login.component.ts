import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthServiceService) { }
  email: string = ''
  password: string = '';
  type: String = '';



  style = {
    border: "2px solid red"
  }


  ngOnInit(): void {
  }

  form : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]) ,
    type:new FormControl('', [Validators.required])});
  chooseType(e: any) {
    this.type = e.target.value;
  }
  goHome() {
    this.auth.login(this.email, this.password, this.type).subscribe(data => {
      window.localStorage.setItem('token', `${data.accessToken}`)
      window.localStorage.setItem('user', JSON.stringify(data.user))

      //   let oldHref = window.location.href;
      //  let newHref = oldHref.replace("Login", "Home");
      //   window.location.href = newHref;
    });



  }
}
