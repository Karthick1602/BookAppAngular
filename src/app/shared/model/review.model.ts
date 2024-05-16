export class Review {
     id?: string;
     bookId: string;
     reviewerId: string;
     reviewContent: string;
     rating: number;

    constructor(
        id: string,
        bookId: string,
        reviewerId: string,
        reviewContent: string,
        rating: number
    ) {
        this.id = id;
        this.bookId = bookId;
        this.reviewerId = reviewerId;
        this.reviewContent = reviewContent;
        this.rating = rating;
    }

}
