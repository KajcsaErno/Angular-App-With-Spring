import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../service/user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent {

  user: User;
  private id = +this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
      private router: Router,
        private userService: UserService,
          private location: Location) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
   
    this.userService.getUser(this.id)
      .subscribe(user => this.user = user);
  }

  onSave() {
    this.userService.updateUser(this.id, this.user).subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
