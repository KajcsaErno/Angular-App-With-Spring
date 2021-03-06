import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { User } from '../model/user';
import { UserService } from '../service/user-service.service';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private userService: UserService, private location: Location ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }

  goBack() {
    this.location.back();
  }

  }


