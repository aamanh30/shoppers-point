import {
  Component,
  Input,
  ChangeDetectionStrategy,
  input,
  signal,
} from '@angular/core';
import { User } from '../../../state/models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shoppers-point-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  user = input<User | undefined | null>();
  wishlist = input<number[] | undefined | null>();
  productQuantities = input<number[] | undefined | null>();
  collapseNavbar = signal(true);

  onNavbarCollapseChanged(): void {
    this.collapseNavbar.update(collapseNavbar => !collapseNavbar);
  }
}
