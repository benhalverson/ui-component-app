import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LibModalDialog } from '@benhalverson/my-awesome-lib';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export type ModalVariant = 'default' | 'danger' | 'success' | 'warning';

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  variant: ModalVariant;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'OK',
  cancelText: 'Cancel',
  showCancel: false,
  variant: 'default',
};

@Injectable({ providedIn: 'root' })
export class ModalService extends signalStore(
  withState<ModalState>(initialState),
  withMethods((store) => ({
    showAlert(message: string, title = 'Alert') {
      patchState(store, {
        isOpen: true,
        title,
        message,
        confirmText: 'OK',
        cancelText: 'Cancel',
        showCancel: false,
        variant: 'default',
      });
    },


    showSuccess(message: string, title = 'Success') {
      console.log('Showing success modal');
      this.modal.open(LibModalDialog, {data: store});
      patchState(store, {
        isOpen: true,
        title,
        message,
        confirmText: 'OK',
        cancelText: 'Cancel',
        showCancel: false,
        variant: 'success',
      });
    },

    showError(message: string, title = 'Error') {
      patchState(store, {
        isOpen: true,
        title,
        message,
        confirmText: 'OK',
        cancelText: 'Cancel',
        showCancel: false,
        variant: 'danger',
      });
    },

    showConfirm(message: string, title = 'Confirm') {
      patchState(store, {
        isOpen: true,
        title,
        message,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        showCancel: true,
        variant: 'default',
      });
    },

    showDangerConfirm(message: string, title = 'Warning') {
      patchState(store,{
        isOpen: true,
        title,
        message,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        showCancel: true,
        variant: 'danger',
      })
    },

    close() {
      patchState(store, { ...initialState });
    },
  }))
) {

 modal = inject(MatDialog); 
}
