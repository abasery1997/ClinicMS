import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/auth-service.service';


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
  ngOnInit(): void {
  }

  chooseType(e: any) {
    this.type = e.target.value;
  }
  goHome() {
    this.auth.login(this.email, this.password, this.type).subscribe(data => {
      window.localStorage.setItem('token', `${data.accessToken}`)
      window.localStorage.setItem('user', JSON.stringify(data.user))

        //need to be checked 
        let oldHref = window.location.href;
        let newHref = oldHref.replace("Login", "Home");
        window.location.href = newHref;
    });



  }
}
