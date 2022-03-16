import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeElement: HTMLElement | undefined;
  constructor() {
  }
  isToggle: boolean = false;
  ngOnInit(): void {
    //active navbar buttons
    let path = location.pathname.slice(1);
    this.active(document.getElementById((path == '') ? 'Home' : path)!);

    //toggler
    // let toggler = document.getElementById("toggler")!;
    // toggler.addEventListener("click", function () {
    //   this.parentElement!.style.width = "80px";
    //   this.classList.replace("ms-auto", "text-center");
    //   links.forEach((link) => {
    //     link.classList.add("text-center");
    //     link.children[0].classList.add("fs-5");
    //     link.children[1].classList.add("d-none");
    //     document.getElementById("userInfo")!.classList.add("d-none");
    //   });
    // });
  }
  toggle(): void {
    this.isToggle = !this.isToggle;
    console.log(this.isToggle);
  }
  active(element: HTMLElement) {
    if (this.activeElement?.id != element.id) {
      element.classList.add('active');
      if (this.activeElement != undefined) { this.activeElement.classList.remove('active'); }
      this.activeElement = element;
    }
  }
  logout() {

  }
}
