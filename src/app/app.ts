import { Component, inject } from '@angular/core';
import { LibModalDialog as LibModal } from '@benhalverson/my-awesome-lib';
import { ModalService } from './services/modal.service';
import { ThemeService } from './services/theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [LibModal, RouterLink, RouterOutlet, RouterLinkActive, MatToolbarModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.html',
    styleUrls: ['./app.css'],
})
export class App {
  private modalService = inject(ModalService);
  themeService = inject(ThemeService);
  
  protected title = 'my-app';
  isLoggedIn = false;
  currentUser = '';

  onModalConfirm(): void {
    this.modalService.showConfirm(
      'Are you sure you want to proceed?',
      'Confirm Action'
    );
    this.modalService.close();
  }

  onModalCancel(): void {
    this.modalService.showCancel();
    
    this.modalService.close();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
