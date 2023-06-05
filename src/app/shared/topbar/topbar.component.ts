import { Component, Input } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'shoppers-point-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Input() user: User | undefined | null;
}
