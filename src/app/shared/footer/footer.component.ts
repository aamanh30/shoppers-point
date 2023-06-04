import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'shoppers-point-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() user: User | undefined | null;

  onLogOut(): void {}
}
