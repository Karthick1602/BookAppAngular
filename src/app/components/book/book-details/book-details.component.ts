import { Component } from '@angular/core';
import { ReviewModalComponent } from '../review-modal/review-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { Book } from 'src/app/shared/model/book.model';
import { Review } from 'src/app/shared/model/review.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  title: any;
  bookId: any;
  reviewerId: any;
  book: Book={
    title: '',
    author: '',
    publisher: '',
    imageLink: '',
    price: 0,
    category: '',
    publishedDate: '',
    isbn: ''
  };
  rating: any;
  numberOfReviews: any;
  review!: Review;
  reviews: Review[] = [];

  constructor(private route: ActivatedRoute,private dialog: MatDialog, private homeService:HomeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.getBookDetails(this.bookId);
      this.getAllReviews(this.bookId);
      
    });
  }
  getBookDetails(bookId: string): void {
    this.homeService.getBookDetails(bookId).subscribe(book => {
      this.book = book;
      this.rating = 4;
      this.numberOfReviews = 2;
    });
  }

  getAllReviews(bookId: string): void {
    this.homeService.getReviewByBook(bookId).subscribe(review =>{
      this.reviews= review;
      console.log(this.reviews.length, this.reviews)
    })

  }
  getStars(rating: number): number[] {
    if (rating === 0) {
      return [0, 0, 0, 0, 0]; // Return an array of 5 empty stars
    }
  
    const fullStars = Math.floor(rating); // Get the number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const stars: number[] = [];
  
    // Push full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }
  
    // Push half star if present
    if (hasHalfStar) {
      stars.push(0.5);
    }
  
    // Fill remaining stars with empty stars
    const totalStars = Math.ceil(rating); // Calculate total stars needed (rounding up)
    const remainingStars = 5 - totalStars; // Calculate the number of remaining empty stars
    for (let i = 0; i < remainingStars; i++) {
      stars.push(0);
    }
  
    return stars;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      width: '400px',
      height: '600px',
      data: { title: this.title, bookId: this.bookId, reviewerId:this.reviewerId } // Pass the two values
    });
  }
}
