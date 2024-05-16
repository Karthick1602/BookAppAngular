import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { HomeBook } from 'src/app/shared/model/home.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  homeBooks: HomeBook[] = [];
  currentPage: number = 1; // Current page
  pageSize: number = 9; // Number of books per page
  totalPages: number = 0; // Total number of pages


  constructor(public router: Router,private homeService: HomeService) { }

  
  ngOnInit(): void {
    this.loadBooks();
    
    
  }

loadBooks() {
  this.homeService.getAllBooks(this.currentPage, this.pageSize)
  .subscribe(
    (response: any) => {
      // Assuming the response structure is { content: HomeBook[] }
      if (response.content) {
        this.homeBooks = response.content.map((item: any) => {
          return new HomeBook(item.title, item.author,item.publisher,item.category, item.imageLink, item.bookId,item.rating,item.numberOfReviews);
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



navigateToBookDetails(book: HomeBook) {
  // Navigate to the book details form, passing the book ID or any necessary data
  this.router.navigate(['/book-details', book.bookId]); // Example: Assuming the route is '/book-details/:id'
}



  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks(); // Load books for the next page
  }
   
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks(); // Load books for the previous page
  }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    if(sessionStorage.getItem('loggedIn')){
      return true;
    }else{
      return false;
    }
  }
  isAdmin():boolean {
    if(sessionStorage.getItem('isAdmin')){
      return true;
    }else{
      return false;
    }
    }
    isUser():boolean{
      if(sessionStorage.getItem('isUser')){
        return true;
      }else{
        return false;
      }
      }


    }
  

