import { Component, OnInit, Input } from '@angular/core';

import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
  public dialogRef: MatDialogRef<EditProfileComponent>,
  public router: Router,
  public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('You updated your profile!', 'Ok', {
        duration: 2000,
      });

      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome'])
        this.snackBar.open(
          'please login again',
          'ok',
          {
            duration: 2000,
          }
        );
      }
    });
  }
}
