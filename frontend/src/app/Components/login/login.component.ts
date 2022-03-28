import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goHome(){
    let oldHref= window.location.href;
    let newHref = oldHref.replace("Login","Home");
    window.location.href = newHref;

  }
}
