import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/shared/model/book.model';
import { BookService} from 'src/app/services/book.service'
import { BookModalComponent } from './book-modal/book-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  bookForm!: FormGroup;
  books!: Book[];
  bookId: any;
  totalPages: any;

  constructor(private fb: FormBuilder, private bookService: BookService,public router: Router,private route: ActivatedRoute,private dialog: MatDialog,) { }
  pageSize: number = 9; // Number of books per page
  currentPage: number = 1;
    reviewsPerPage: number = 4; // Adjust as needed
    totalReviews: number = 0;
  ngOnInit(): void {
    this.loadBooks();
    this.initForm();
    
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      imageLink: ['', Validators.required],
      price: ['',Validators.required],
      category:['',Validators.required],
      publishedDate: ['', Validators.required],
      isbn: ['', Validators.required]


    });
  }

  loadBooks() {
    this.bookService.getAllBooks(this.currentPage, this.pageSize)
    .subscribe(
      (response: any) => {
        if (response.content) {
          this.books = response.content.map((item: any) => {
            return new Book(item.title, item.author,item.publisher,item.imageLink,item.price,item.category, item.publishedDate,item.isbn);
          });
  
        } else {
          console.error('Invalid response format: Content array not found');
        }
        this.totalPages=response.totalPages;
      },
      error => {
        console.error('Error loading books: ', error);
      }
    );
  }
 

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      if (formData.id) {
        // Edit book
        this.bookService.editBook(formData);
      } else {
        // Add new book
        this.bookService.createBook(formData);
      }
      this.initForm(); // Reset the form
    }
  }

  editBook(book: Book): void {
    this.bookForm.patchValue(book); // Update form with book data
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book);
  }
  calculateCeil(): number {
    return Math.ceil(this.totalReviews / this.reviewsPerPage);
  }
  

  paginateReviews(): any[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.books.slice(startIndex, endIndex);
}
prevPage(): void {
  if (this.currentPage > 1) {
      this.currentPage--;
  }
}

nextPage(): void {
  if (this.currentPage < Math.ceil(this.totalReviews / this.reviewsPerPage)) {
      this.currentPage++;
  }
}
 


  
  openDialog(): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '400px',
      height: '600px',
      data: { bookId: this.bookId } // Pass the two values
    });
  }
}
