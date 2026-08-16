import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../models/user';

@Component({
    selector: 'shoppers-point-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FooterComponent {
  @Input() user: User | undefined | null;
  @Output() signout: EventEmitter<void> = new EventEmitter<void>();

  onSignOut(): void {
    this.signout.emit();
  }
}
