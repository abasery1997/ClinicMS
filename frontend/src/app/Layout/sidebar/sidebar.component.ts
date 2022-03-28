import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeElement: HTMLElement | undefined;

  type :string='';
  constructor( private router:Router) {
  }
  ngAfterViewInit(): void {

  }
  isToggle: boolean = false;
  ngOnInit(): void {
    
    //active navbar buttons
    let path = location.pathname.slice(1);
    this.active(document.getElementById((path == '') ? 'Home' : path)!);
    this.type=JSON.parse(localStorage.getItem('userData')||'').type;
  }
  toggle(): void {
    this.isToggle = !this.isToggle;
  }
  active(element: HTMLElement) {
    if (this.activeElement?.id != element?.id) {
      element.classList.add('active');
      if (this.activeElement != undefined) { this.activeElement.classList.remove('active'); }
      this.activeElement = element;
    }
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/Login']);
  }
}
