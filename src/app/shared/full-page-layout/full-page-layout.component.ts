import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'shoppers-point-full-page-layout',
  templateUrl: './full-page-layout.component.html',
  styleUrls: ['./full-page-layout.component.scss']
})
export class FullPageLayoutComponent {
  user$: Observable<User | undefined> = EMPTY;
  constructor(private userService: UserService) {
    this.user$ = this.userService.user;
  }
}
