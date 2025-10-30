import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibModal } from '@benhalverson/my-awesome-lib';
import { ModalService } from './services/modal.service';
import { ThemeService } from './services/theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, LibModal],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private modalService = inject(ModalService);
  themeService = inject(ThemeService);
  modalState$ = this.modalService.modalState$;
  
  protected title = 'my-app';
  isLoggedIn = false;
  currentUser = '';

  onModalConfirm(): void {
    const state = this.modalService.modalState.value;
    if (state.onConfirm) {
      state.onConfirm();
    }
    this.modalService.close();
  }

  onModalCancel(): void {
    const state = this.modalService.modalState.value;
    if (state.onCancel) {
      state.onCancel();
    }
    this.modalService.close();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
