import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@shoppers-point/shared-state';

@Component({
  selector: 'shoppers-point-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class TopbarComponent {
  user = input<User | undefined | null>();
  signOut = output<void>();
  expanded = signal(false);

  onSignOut(): void {
    this.expanded.set(false);
    this.signOut.emit();
  }

  onToggle(): void {
    this.expanded.update(expanded => !expanded);
  }
}
