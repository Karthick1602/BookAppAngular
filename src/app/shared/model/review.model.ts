export class Review {
     id?: string;
     bookId: string;
     reviewerId: string;
     reviewerName: string;
     reviewContent: string;
     rating: number;

    constructor(
        bookId: string,
        reviewerId: string,
        reviewerName: string,
        reviewContent: string,
        rating: number
    ) {
        this.bookId = bookId;
        this.reviewerId = reviewerId;
        this.reviewerName= reviewerName;
        this.reviewContent = reviewContent;
        this.rating = rating;
    }

}
