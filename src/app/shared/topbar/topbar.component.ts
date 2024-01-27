import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'shoppers-point-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Input() user: User | undefined | null;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  expanded = false;

  onSignOut(): void {
    this.expanded = false;
    this.signOut.emit();
  }

  onToggle(): void {
    this.expanded = !this.expanded;
  }
}
