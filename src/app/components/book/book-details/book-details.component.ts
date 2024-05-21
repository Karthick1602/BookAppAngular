import { Component } from '@angular/core';
import { ReviewModalComponent } from '../review-modal/review-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  showReviews: boolean = false;
  numberOfReviews: any;
  review!: Review;
  selectedSortOption: string = 'ratingHighToLow';
  
  currentPage: number = 1;
    reviewsPerPage: number = 4; // Adjust as needed
    totalReviews: number = 0;
    reviews: Review[] = [];

  constructor(public router: Router,private route: ActivatedRoute,private dialog: MatDialog, private homeService:HomeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.getBookDetails(this.bookId);
      this.getAllReviews(this.bookId);
      
    });
  }

  sortReviews(): void {
    if (this.selectedSortOption === "ratingHighToLow") {
        this.reviews.sort((a, b) => b.rating - a.rating); // Sort high to low
        console.log(this.reviews);
    } else if (this.selectedSortOption === "ratingLowToHigh") {
        this.reviews.sort((a, b) => a.rating - b.rating); // Sort low to high
    }
    // Reset current page to 1 after sorting
    this.currentPage = 1;
}

  calculateCeil(): number {
    return Math.ceil(this.totalReviews / this.reviewsPerPage);
  }
  

  paginateReviews(): any[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.reviews.slice(startIndex, endIndex);
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


  toggleReviews() {
    this.showReviews = !this.showReviews;
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
      this.totalReviews = this.reviews.length;
      this.rating = 4;
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

  isLoggedIn(): boolean {
    if(sessionStorage.getItem('loggedIn')){
      return true;
    }else{
      return false;
    }
  }
  navigateToHome(){
  this.router.navigate(['/home']);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  refreshParentComponent() {
    // Reload the parent component or perform any action needed to refresh it
    window.location.reload(); // Example: Reload the page
  }

}
