import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public isUser!: boolean;
  public percent!: number | null;
  constructor(private userService: UserService) {
    this.percent = 20;
  }

  ngOnInit(): void {}

  onClick(isUser: boolean) {
    this.isUser = isUser;
  }
  onSave() {
    console.log('this.percent: ', this.percent);
    this.userService.updateUser({
      isTrader: this.isUser != null ? !this.isUser : null,
      percent: this.percent,
    });
  }
  updatePercent(a: number) {
    console.log(a);
  }
}
