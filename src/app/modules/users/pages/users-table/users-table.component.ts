import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user$ = this.authService.user$;

  constructor(
    private userService : UsersService,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.init(users)
    })
  }

}
