import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { SessionService } from '../../../../services/session.service';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  user?: User;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.user = this.sessionService.user;
  }
}
