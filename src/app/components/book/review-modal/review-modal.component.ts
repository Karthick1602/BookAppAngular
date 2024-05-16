
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { HomeService } from 'src/app/services/home.service';
import { Review } from 'src/app/shared/model/review.model';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {
  reviewForm!: FormGroup; 
  bookId: any;
  reviewerId: any;
  showForm: boolean = false;
  title: any;

  constructor(
    private dialogRef: MatDialogRef<ReviewModalComponent>,
    private fb: FormBuilder,
    private messageService: MessageService,
    private homeBookService: HomeService,
    @Inject(MAT_DIALOG_DATA) public data: { title: any,bookId: any, reviewerId: any } 
  ) {
    this.title=data.title,
    this.bookId = data.bookId; 
    this.reviewerId = data.reviewerId; 
  }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      reviewerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      reviewContent: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }


  get reviewerName() {
    return this.reviewForm.controls['reviewerName'];
  }

  get reviewContent() {
    return this.reviewForm.controls['reviewContent'];
  }
  get rating() {
    return this.reviewForm.controls['rating'];
  }

  submitDetails(): void {
    if (this.reviewForm.valid) {
      const {reviewerName,reviewContent,rating} = this.reviewForm.value;
      let review = new Review(this.bookId as string,this.reviewerId as string,reviewerName as string,reviewContent as string,rating as unknown as number);
      
      this.homeBookService.postReview(review).subscribe(
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
