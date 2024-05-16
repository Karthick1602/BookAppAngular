export class HomeBook {
    title: string;
    author: string;
    publisher: string;
    category: string;
    imageLink: string;
    bookId: string;
    rating: number;
    numberOfReviews: number;

    constructor(
        title: string,
        author: string,
        publisher: string,
        category: string,
        imageLink: string,
        bookId: string,
        rating: number,
        numberOfReviews: number
    ) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.category = category;
        this.imageLink = imageLink;
        this.bookId = bookId;
        this.rating = rating;
        this.numberOfReviews = numberOfReviews;
    }

    // Getters and setters can be added if needed
}
