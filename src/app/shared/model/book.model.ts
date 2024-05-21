export class Book {
    id ?:string;
     title: string;
     author: string;
     publisher: string;
     imageLink:string;
     price: number;
     category: string;
     publishedDate: string;
     isbn: string;
    constructor(
       title: string,
       author: string,
       publisher: string,
       imageLink:string,
       price: number,
       category: string,
       publishedDate: string,
       isbn: string
    ) {
        this.title=title;
        this.author=author;
        this.publisher=publisher;
        this.imageLink=imageLink;
        this.price=price;
        this.category=category;
        this.publishedDate=publishedDate;
        this.isbn=isbn;
    }

    
  }