import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-toast-notification',
  standalone:true,
  template: `
    <div #toastContainer class="toast-container position-fixed top-0 end-0 p-3">
      <div #toastLive class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Notification</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          This is a Bootstrap toast notification!
        </div>
      </div>
    </div>
  `,
})
export class ToastNotificationComponent implements AfterViewInit {
  @ViewChild('toastTrigger') toastTrigger!: ElementRef;
  @ViewChild('toastLive') toastLive!: ElementRef;

  ngAfterViewInit(): void {
    if (this.toastTrigger && this.toastLive) {
      const toastBootstrap = new bootstrap.Toast(this.toastLive.nativeElement, { delay: 3000 });
      this.toastTrigger.nativeElement.addEventListener('click', () => {
        toastBootstrap.show();
      });
    }
  }
}
