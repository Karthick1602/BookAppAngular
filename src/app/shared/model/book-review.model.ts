export class BookReview {
    bookId: string;
    reviewerId: string;
    reviewerName: string; // Assuming this corresponds to the userId from User class
    reviewContent: string;
     rating: number;

    constructor(bookId: string, reviewerId: string, reviewerName: string, reviewContent: string, rating: number) {
        this.bookId = bookId;
        this.reviewerId = reviewerId;
        this.reviewerName = reviewerName;
        this.reviewContent = reviewContent;
        this.rating = rating;
    }

    // Getters and setters for encapsulation
    getBookId(): string {
        return this.bookId;
    }

    setBookId(bookId: string): void {
        this.bookId = bookId;
    }

    getReviewerId(): string {
        return this.reviewerId;
    }

    setReviewerId(reviewerId: string): void {
        this.reviewerId = reviewerId;
    }

    getReviewerName(): string {
        return this.reviewerName;
    }

    setReviewerName(reviewerName: string): void {
        this.reviewerName = reviewerName;
    }

    getReviewContent(): string {
        return this.reviewContent;
    }

    setReviewContent(reviewContent: string): void {
        this.reviewContent = reviewContent;
    }

    getRating(): number {
        return this.rating;
    }

    setRating(rating: number): void {
        this.rating = rating;
    }
}
