import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '#/app/ts/interface';
import { ApiRoutes, ButtonSizes, ButtonVariants } from '#/app/ts/enum';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '#/app/components/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonSizes = ButtonSizes;
  buttonVariants = ButtonVariants;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<UserInterface[]>(ApiRoutes.Users).subscribe({
      next: (data: UserInterface[]) => {
        console.log('users', data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
