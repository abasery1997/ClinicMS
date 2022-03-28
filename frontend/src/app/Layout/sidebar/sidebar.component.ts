import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeElement: HTMLElement | undefined;

  type :string='';
  constructor() {
  }
  ngAfterViewInit(): void {

  }
  isToggle: boolean = false;
  ngOnInit(): void {
    
    //active navbar buttons
    let path = location.pathname.slice(1);
    this.active(document.getElementById((path == '') ? 'Home' : path)!);
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

  }
}
