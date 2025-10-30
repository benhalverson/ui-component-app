import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibButton, LibCard } from '@benhalverson/my-awesome-lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, LibButton, LibCard],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
