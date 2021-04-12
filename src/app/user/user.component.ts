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
  userDetails!: User;
  isDobNull!: boolean;
  isGenderNull!: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.authService.getAuthState()) {
      this.userService.getUserFromDB().subscribe((dbres) => {
        this.userDetails = dbres;
        console.log(dbres)
        if(this.userDetails.dob === null) {
          this.isDobNull = true;
        }
        if(this.userDetails.gender === null) {
          this.isGenderNull = true;
        }
      });
    }
  }
}
