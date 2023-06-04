import { Component, Input } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'shoppers-point-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() user: User | undefined | null;
  @Input() wishlist: number[] | undefined | null;
  @Input() products: number[] | undefined | null;
}
