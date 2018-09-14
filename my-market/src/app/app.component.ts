import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event:Event){
    let scrollOffset = $event.srcElement.children[0].scrollTop;
    console.log("window scroll: ", scrollOffset);
  }
}
