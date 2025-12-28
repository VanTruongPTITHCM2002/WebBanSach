import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Publisher } from '../../../entity/Publisher';
import { Subscription } from 'rxjs';
import { PublisherService } from '../../../service/PublisherService';
import Swal from 'sweetalert2';
import { showResponseFailure, showResponseSuccess } from '../../response/sweetAlert';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-publishers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.css',
})
export class AdminPublishersComponent implements OnInit {
  publishers: Publisher[] = [];
  page: number = 1;
  size: number = 5;
  currentPage: number = 1;
  isLastPage: boolean = false;
  getPublishers: Subscription;
  deletePublisher: Subscription;
  addPublisher: Subscription;
  changePublisher: Subscription;
  txtSearch: string = '';
  loading: boolean = false;
  totalPages: number = 1;
  query: any = {};
  @ViewChild('closeBtn', { static: false })
  closeBtn!: ElementRef<HTMLButtonElement>;
  updatePublisher: Publisher = {
    publisherAddress: '',
    publisherName: '',
    publisherId: 0,
  };
  @ViewChild('createForm') createForm!: NgForm;


  constructor(private publisherService: PublisherService) {
    this.getPublishers = new Subscription();
    this.changePublisher = new Subscription();
    this.deletePublisher = new Subscription();
    this.addPublisher = new Subscription();
  }
  ngOnInit(): void {
    this.loadPublishers(this.currentPage);
  }

  loadPublishers(page: number) {
    this.getPublishers.unsubscribe();
    this.loading = true;
    this.getPublishers = this.publisherService
      .getPublishers(page, this.size, this.query)
      .subscribe((data) => {
        this.publishers = data.data?.content || [];
        this.currentPage = page!;
        this.totalPages = data.data.totalPages;
        this.loading = false;
      });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;

    this.loadPublishers(page);
  }

  handleSearch() {
    this.page = 1;
    this.query.search = this.txtSearch.trim();
    this.loadPublishers(this.page);
  }

  handleUpdate(publisher: Publisher) {
    this.updatePublisher = { ...publisher };
  }

  handleDelete(publisherId: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa nhà xuất bản này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePublisher = this.publisherService
          .deletePublisher(publisherId)
          .subscribe({
            next: (value) => {
              if (value.statusCode !== 200)
                return showResponseFailure(value.message);
              showResponseSuccess(value.message);
              this.publishers = this.publishers.filter(
                (publisher) => publisher.publisherId !== publisherId
              );
            },
            error(err) {
              showResponseFailure(err.message);
            },
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.focusFirstInvalid(form);
      return;
    }
      const formData = form.value;

      const data = {
        publisherName: formData.publisherName,
        publisherAddress: formData.publisherAddress,
      };

      this.addPublisher = this.publisherService.addPublisher(data).subscribe({
        next: (value) => {
          if (value.statusCode !== HttpStatusCode.Created) {
            return showResponseFailure(value.message || 'Có lỗi xảy ra');
          }
          form.resetForm();
          showResponseSuccess(value.message);
        },
        error : (err : unknown)  => {
          if (err instanceof Error)
          showResponseFailure(err.message);
        },
      });
  }

  update() {
    const { publisherId, ...rest } = this.updatePublisher;
    const newPublisher = rest;

    this.changePublisher = this.publisherService
      .updatePublisher(this.updatePublisher.publisherId!, newPublisher)
      .subscribe({
        next: (value) => {
          showResponseSuccess(value.message);
          this.loadPublishers(this.page);
        },
        error(err) {
          showResponseFailure(err.message);
        },
      });
  }
  focusFirstInvalid(form: NgForm) {
    const controls = form.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        const invalidControl = document.querySelector(
          `[name="${name}"]`
        ) as HTMLElement;

        if (invalidControl) {
          invalidControl.focus();
          invalidControl.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
        break;
      }
    }
  }

   ngAfterViewInit() {
    const modalEl = document.getElementById('myModal');
    modalEl?.addEventListener('hidden.bs.modal', () => {
      this.createForm.resetForm();
    });
  }
}
