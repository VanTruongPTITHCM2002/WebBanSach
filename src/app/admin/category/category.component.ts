import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../entity/Category';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { showResponseFailure, showResponseSuccess } from '../../response/sweetAlert';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class AdminCategoryComponent implements OnInit {
  categories: Category[] = [];
  page: number = 1;
  getCategories: Subscription;
  addCategory: Subscription;
  updateCategory: Subscription;
  deleteCategory: Subscription;
  txtSearch = null;
  isUpdate: boolean = false;
  isLastPage = false;
  currentPage = 1;
  pageSize = 5;
  categoryName: string = '';
  updateCategoryName: string = '';
  totalPages: number = 1;
  loading = false;
  categoryId: string = '';
  @ViewChild('closeBtn', { static: false })
  closeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeBtnUpdate', { static: false })
  closeBtnUpdate!: ElementRef<HTMLButtonElement>;

  constructor(private categoryService: CategoryService) {
    this.getCategories = new Subscription();
    this.addCategory = new Subscription();
    this.updateCategory = new Subscription();
    this.deleteCategory = new Subscription();
  }

  ngOnInit(): void {
    this.loadCategories(this.currentPage);
  }

  loadCategories(page: number) {
    this.getCategories.unsubscribe();
    this.getCategories = this.categoryService
      .getCategories(page, this.pageSize, this.txtSearch!)
      .subscribe((data) => {
        this.categories = data.data.content || [];
        this.currentPage = page!;
        this.totalPages = data.data.totalPages || 1;
      });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;
    this.loadCategories(page);
  }

  insertCategory() {
     if (!this.categoryName || !this.categoryName.trim()) {
       showResponseFailure('Vui lòng nhập tên danh mục');
       return;
     }
    this.addCategory = this.categoryService
      .addCategory(this.categoryName)
      .subscribe((data) => {
        showResponseSuccess(data.message);
        this.closeBtn.nativeElement.click();
        this.loadCategories(this.page);
      });
  }

  handleSearch() {
    this.page = 1;
    this.loadCategories(this.page);
  }

  selectedCategory(categoryName: string, categoryId: string) {
    this.isUpdate = true;
    this.updateCategoryName = categoryName;
    this.categoryId = categoryId;
  }

  patchCategory() {
    this.updateCategory = this.categoryService
      .updateCategory(this.categoryId, this.updateCategoryName)
      .subscribe((data) => {
        showResponseSuccess(data.message);
        this.closeBtnUpdate.nativeElement.click();
        this.loadCategories(this.page);
      });
  }

  removeCategory(categoryId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory = this.categoryService
          .deleteCategory(categoryId)
          .subscribe({
            next: (value) => {
              if (value.statusCode !== 200)
                return showResponseFailure(value.message);
              showResponseSuccess(value.message);
              this.categories = this.categories.filter(
                (category) => category.categoryId !== categoryId
              );
            },
            error(err) {
              showResponseFailure(err.message);
            },
          });
      }
    });
  }
}
