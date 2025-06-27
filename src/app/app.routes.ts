import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CategoryComponent } from './category/category.component';
import { AuthComponent } from './auth/auth.component';
import { DetailComponent } from './detail/detail.component';
import { BookComponent } from './book/book.component';
import { AdminLoginComponents } from './admin/login/login.component';
import { CustomerLayoutComponent } from './customer/customer.component';
import { AdminLayoutComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from '../guard/admin.gurad';
import { AdminBookComponent } from './admin/book/book.component';
import { AuthorsComponent } from './admin/authors/authors.component';
import { BookCreateComponent } from './admin/book/book.create/book.create.component';
import { UpdateComponent } from './admin/book/update/update.component';

export const routes: Routes = [

    {path: 'login',component: AdminLoginComponents, title: "Đăng nhập quản lý"},
     {
    path: '',
    component: CustomerLayoutComponent,
    children: [
        { path: '', component: HomeComponent, title: "Trang chủ" },
        { path: 'auth/login', component: AuthComponent, title: "Đăng nhập" },
        { path: 'auth/signup', component: AuthComponent, title: "Đăng ký" },
        { path: 'category/:id', component: DetailComponent, title: "Danh sách sách" },
        { path: 'book/:id', component: BookComponent, title: "Chi tiết sách" },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
      { path: 'books', component: AdminBookComponent, canActivate: [AuthGuard]},
      { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard]},
      { path: 'books/create', component: BookCreateComponent, canActivate: [AuthGuard]},
      { path: 'books/update/:id', component: UpdateComponent, canActivate: [AuthGuard]}
      // ... các route cho admin
    ]
  }
    // { path: 'contact', redirectTo: '/lien-he', pathMatch: 'full' },
    // { path: 'category/:id', component:CategoryComponent },
    // { path: '**', component: NotFoundComponent }
];
