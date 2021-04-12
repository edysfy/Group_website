import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  private userDetails!: User;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.authService.getAuthState()) {
      this.userService.getUserFromDB().subscribe((user) => {
        this.userDetails = user;
        console.log(this.userDetails);
      });
    }
  }
}
