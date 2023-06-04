import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'shoppers-point-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user: User | undefined | null;
}
