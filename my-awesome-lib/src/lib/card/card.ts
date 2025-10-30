import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class LibCard {
  @Input() title?: string;
  @Input() elevated = false;
  
  headerTemplate = false;
  footerTemplate = false;
}
