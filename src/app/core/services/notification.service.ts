import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showAlert(bodyAlert: any) {
    return Swal.fire({
      icon: bodyAlert.icon || "success",
      title: bodyAlert.message || "",
      showConfirmButton: false,
      timer: 2500,
    });
  }
}
