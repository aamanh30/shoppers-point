import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../models';

@Component({
    selector: 'shoppers-point-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NavbarComponent {
  @Input() user: User | undefined | null;
  @Input() wishlist: number[] | undefined | null;
  @Input() productQuantities: number[] | undefined | null;
  collapseNavbar = true;

  onNavbarCollapseChanged(): void {
    this.collapseNavbar = !this.collapseNavbar;
  }
}
