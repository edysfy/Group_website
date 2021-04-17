import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  age!: number;
  isDobNull!: boolean;
  dobEdit!: boolean;
  isGenderNull!: boolean;
  genderEdit!: boolean;
  todayDate: Date = new Date();
  minDate: Date = new Date();
  dobString: string = 'n/a';

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.minDate.setFullYear(this.todayDate.getFullYear() - 100);
  }

  ngOnInit(): void {
    if (this.authService.getAuthState().getValue()) {
      this.userService.getUserFromDB().subscribe((dbres) => {
        this.userDetails = dbres;
        if (this.userDetails.dob === 'n/a') {
          this.isDobNull = true;
        }
        if (this.userDetails.gender === 'n/a') {
          this.isGenderNull = true;
        }
        if (!this.isDobNull) {
          this.calculateAge(this.userDetails.dob);
          this.userService.updateAge(this.age);
        }
      });
    }
  }

  calculateAge(dob: string) {
      const birthday = Date.parse(dob);
      const ageDifTime = Date.now() - birthday;
      const age = new Date(ageDifTime);
      this.age = Math.abs(age.getUTCFullYear() - 1970);
    
  }

  saveDate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userDetails.dob = form.value.dob.toDateString();
    this.calculateAge(this.userDetails.dob);
    this.isDobNull = false;
    this.dobEdit = false;
    this.userService.updateDate(form.value.dob);
  }

  saveGender(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (
      form.value.gender.toLowerCase() === 'male' ||
      form.value.gender.toLowerCase() === 'female'
    ) {
      this.isGenderNull = false;
      this.genderEdit = false;
      this.userDetails.gender = form.value.gender;
      this.userService.updateGender(form.value.gender);
    }
  }

  onAgeEdit() {
    this.dobEdit = true;
  }


  onGenderEdit() {
    this.genderEdit = true;
  }
}
