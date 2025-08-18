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
  styleUrl: './publishers.component.css'
})
export class AdminPublishersComponent implements OnInit{

  publishers: Publisher[] = [];
  page: number = 1;
  size: number = 5;
  currentPage: number = 1;
  isLastPage: boolean = false;
  getPublishers: Subscription;
  deletePublisher: Subscription;
  addPublisher: Subscription;
  changePublisher: Subscription;
  updatePublisher: Publisher = undefined!;
  txtSearch: string = '';
  @ViewChild('closeBtn',{static: false}) closeBtn!: ElementRef<HTMLButtonElement>;

  constructor(private publisherService: PublisherService){
    this.getPublishers = new Subscription();
    this.changePublisher = new Subscription();
    this.deletePublisher = new Subscription();
    this.addPublisher = new Subscription();
  }
  ngOnInit(): void {
    this.loadPublishers(this.currentPage);
  }

  loadPublishers(page: number){
    this.getPublishers.unsubscribe();
     this.getPublishers = this.publisherService.getPublishers(page, this.size).subscribe((data) => {
      this.publishers = data.data || []
      this.currentPage = page;
      this.isLastPage = this.publishers.length < this.size;
    }
  );
  }

  setPage(page: number){
    if (page < 1) return;
    if (page === this.currentPage) return;
    if (this.isLastPage && page > this.currentPage) return;

    this.loadPublishers(page);
  }

  handleSearch(){
    if(!this.txtSearch) return this.loadPublishers(this.page);
    this.publishers = this.publishers.filter(pulisher => (pulisher.publisherName.match(this.txtSearch) || pulisher.publisherAddress.match(this.txtSearch)
  ))
   this.currentPage = this.page;
   this.isLastPage = this.publishers.length < this.size;
  }

  handleUpdate(publisher: Publisher){
    this.updatePublisher = {...publisher};
  }

  handleDelete(publisherId: number){
      Swal.fire({
                      title: "Bạn có chắc chắn muốn xóa nhà xuất bản này?",
                      showDenyButton: true,
                      showCancelButton: false,
                      confirmButtonText: "Có",
                      denyButtonText: `Không`
                  }).then((result) => {
                      if (result.isConfirmed) {
                        this.deletePublisher = this.publisherService.deletePublisher(publisherId).subscribe({
                          next: (value) => {
                            if (value.statusCode !== 200) return showResponseFailure(value.message);
                            showResponseSuccess(value.message);
                            this.publishers = this.publishers.filter(publisher => publisher.publisherId !== publisherId)
                          },
                          error(err) {
                            showResponseFailure(err.message);
        
                          },
                        })
                      }
                  });
  }

    onSubmit(form: NgForm){
        if(!form.invalid){
            const formData = form.value;
  
            const data = {
              publisherName: formData.publisherName,
              publisherAddress: formData.publisherAddress
            }
  
            this.addPublisher = this.publisherService.addPublisher(data).subscribe({
              next : (value) => {
                if(value.statusCode !== HttpStatusCode.Created) {
                  showResponseFailure(value.message);
                  form.reset();
                  return;
                }
                   this.closeBtn.nativeElement.click();
                  showResponseSuccess(value.message);
                  
              },
              error(err) {
                  showResponseFailure(err.message);
              },
            });
        }
    }

  update() {
    const { publisherId, ...rest } = this.updatePublisher;
    const newPublisher = rest;

    this.changePublisher = this.publisherService.updatePublisher(this.updatePublisher.publisherId!, newPublisher).subscribe({
      next: (value) => {
        showResponseSuccess(value.message);
        this.closeBtn.nativeElement.click();
        this.loadPublishers(this.page);
      }, error(err) {
        showResponseFailure(err.message);
      },
    })
  }
}
