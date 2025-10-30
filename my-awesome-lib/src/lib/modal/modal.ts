import type { OnInit, OnDestroy } from '@angular/core';
import { Component, input, output } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

export interface ModalConfig {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  variant?: 'default' | 'danger' | 'success' | 'warning';
}

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [A11yModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class LibModal implements OnInit, OnDestroy {
  isOpen = input(false);
  title = input('');
  message = input('');
  confirmText = input('OK');
  cancelText = input('Cancel');
  showCancel = input(false);
  variant = input<'default' | 'danger' | 'success' | 'warning'>('default');
  closeOnOverlayClick = input(true);
  showFooter = input(true);

  confirmed = output<void>();
  cancelled = output<void>();
  closed = output<void>();

  ngOnInit(): void {
    if (this.isOpen()) {
      this.disableBodyScroll();
    }
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  onConfirm(): void {
    this.confirmed.emit();
    this.closed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
    this.closed.emit();
  }

  onOverlayClick(): void {
    if (this.closeOnOverlayClick()) {
      this.cancelled.emit();
      this.closed.emit();
    }
  }

  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }
}
