import { Component, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/model/book.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {

  bookForm!: FormGroup; 
  bookId: any;
  showForm!: boolean;

  constructor(private dialogRef: MatDialogRef<BookModalComponent>,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private messageService: MessageService,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: {bookId: any } ){
      this.bookId = data.bookId; 
    }

    ngOnInit(): void{
      this.bookForm = this.fb.group({
        id: [this.bookId],
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

    get title() {
      return this.bookForm.controls['title'];
    }
  
    get author() {
      return this.bookForm.controls['author'];
    }
    get publisher() {
      return this.bookForm.controls['publisher'];
    }
    get imageLink() {
      return this.bookForm.controls['imageLink'];
    }
  
    get price() {
      return this.bookForm.controls['price'];
    }
    get category() {
      return this.bookForm.controls['category'];
    }
    get publishedDate() {
      return this.bookForm.controls['publishedDate'];
    }
    get isbn() {
      return this.bookForm.controls['isbn'];
    }


  submitDetails(): void {
    if (this.bookForm.valid) {
      const {title,author,publisher,imageLink,price,category,publishedDate,isbn} = this.bookForm.value;
      let book = new Book(title as string, author as string,publisher as string,imageLink as string,price as number,category as string, publishedDate as string,isbn as string);
      
      this.bookService.createBook(book).subscribe(
        response => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Review Created successfully' });
          this.showForm=false;
          
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      )
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
    

  }
}
