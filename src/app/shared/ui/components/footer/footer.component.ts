import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { User } from '@shoppers-point/shared-state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shoppers-point-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class FooterComponent {
  user = input<User | undefined | null>();
  signout = output<void>();

  onSignOut(): void {
    this.signout.emit();
  }
}
