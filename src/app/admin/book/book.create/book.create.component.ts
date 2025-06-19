import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, BookResponse } from '../../../../entity/Book';

@Component({
  selector: 'admin-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.create.component.html',
  styleUrl: './book.create.component.css'
})
export class BookCreateComponent {

  constructor(private location: Location){}

 book: BookResponse = {
  bookid: 0,
  title: '',
  price: 0,
  stock: 0,
  status: true,
  image: '',
  imageBase64: '',
  authorId: {
    authorId: 0,
    firstname: '',
    lastname: '',
  },
  publisherId: {
    publisherId: 0,
    publisherName:'',
    publisherAddress: ''
  },
  category: {
    categoryId: 0,
    categoryName: ''
  }
};

onImageChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.book.image = reader.result?.toString(); // base64 string để gửi về backend
    };
    reader.readAsDataURL(file);
  }
}

goBack(){
  this.location.back();
}


}
