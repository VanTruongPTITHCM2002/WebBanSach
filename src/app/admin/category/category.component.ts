import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../entity/Category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../service/CategoryService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { showResponseFailure, showResponseSuccess } from '../../response/sweetAlert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class AdminCategoryComponent implements OnInit{
    categories: Category[] = [];
    page: number = 1;
    getCategories: Subscription;
    addCategory: Subscription;
    updateCategory: Subscription;
    deleteCategory: Subscription;
    isUpdate: boolean = false;
    isLastPage = false;
    currentPage = 1;
    pageSize = 5;
    categoryName: string = '';
    categoryId: number = 0;
    @ViewChild('closeBtn',{static: false}) closeBtn!: ElementRef<HTMLButtonElement>;
    

    constructor(private categoryService: CategoryService){
      this.getCategories = new Subscription();
      this.addCategory = new Subscription();
      this.updateCategory = new Subscription();
      this.deleteCategory = new Subscription();
    }

    ngOnInit(): void {
      this.loadCategories(this.currentPage);
    }


    loadCategories(page: number){
      this.getCategories.unsubscribe();
      this.getCategories = this.categoryService.getCategories(page, this.pageSize).subscribe((data) => {
          this.categories = data.data || [];
          this.currentPage = page;
          this.isLastPage = this.categories.length < this.pageSize;
      });
    }

    setPage(page: number){
      if (page < 1) return; // Không cho trang nhỏ hơn 1
      if (page === this.currentPage) return; // Không reload trang hiện tại
      if (this.isLastPage && page > this.currentPage) return; // Nếu là trang cuối rồi, không sang trang tiếp theo
        this.loadCategories(page);
    }

    insertCategory(){
        this.addCategory = this.categoryService.addCategory(this.categoryName).subscribe((data) =>{
          showResponseSuccess(data.message);
        });
    }

    selectedCategory(categoryName:string, categoryId: number){
      this.isUpdate = true;
      this.categoryName = categoryName;
      this.categoryId = categoryId;
    }

    patchCategory(){
      this.updateCategory = this.categoryService.updateCategory(this.categoryId, this.categoryName).subscribe((data) => {
        showResponseSuccess(data.message);
        this.closeBtn.nativeElement.click();
        this.loadCategories(this.page);
      })
    }

    removeCategory(categoryId: number){
        Swal.fire({
                title: "Bạn có chắc chắn muốn xóa danh mục này?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Có",
                denyButtonText: `Không`
            }).then((result) => {
                if (result.isConfirmed) {
                  this.deleteCategory = this.categoryService.deleteCategory(categoryId).subscribe({
                    next: (value) => {
                      if (value.statusCode !== 200) return showResponseFailure(value.message);
                      showResponseSuccess(value.message);
                      this.categories = this.categories.filter(category => category.categoryId !== categoryId)
                    },
                    error(err) {
                      showResponseFailure(err.message);
  
                    },
                  })
                }
            });
    }
}
