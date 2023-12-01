import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
  
@Component({
  selector: 'app-sequelize',
  templateUrl: './sequelize.component.html',
  styleUrls: ['./sequelize.component.css']
})
export class SequelizeComponent {
  loadingBar : boolean = false ;

  constructor(private http: HttpClient) {}
  bookname: string = '';
  authour_id: string = '';
  authour_name: string = '';
  books: any[] = [];
  totalBooks: number = 0;
  successMessage: string = '';
  successMessage1: string = '';
  errorMessage:string='';
  bookDetails: any = null;
  fetchbook:string='';
  onSubmit() {
    debugger
    const formData = {
      bookname: this.bookname,
      authour_id: this.authour_id,
      authour_name: this.authour_name
    };
    if(this.bookname!='' || this.authour_id!='' || this.authour_name!=''){
      this.http.post('http://localhost:3001/api/add-book', formData).subscribe(
        (response) => {
          //console.log('Book added successfully:', response);
          //this.toastr.success('Book added successfully!', 'Success');
          //alert("add completed!!")
          this.successMessage1=`${this.bookname} successfully added.....`;
          this.bookname = '';
          this.authour_id = '';
          this.authour_name = '';
          this.fetchBooks();
        },
        (error) => {
          console.error('Error adding book:', error);
        
        }
      );
    }
    else{
      alert("please fill all the fields...")
    }
  }
  ngOnInit(): void {
    this.fetchBooks();
  }
  fetchBooks(): void {
    this.loadingBar = true ;
    setTimeout(()=>{
      this.http.get<any[]>('http://localhost:3001/api/get-books').subscribe((data) => {
      this.books = data;
      this.totalBooks = this.books.length;
      this.loadingBar = false ;
    });
    },2000)
    
  }
  onDelete():void{
    if (!this.bookname) {
      console.error('Book name is undefined or empty');
      return;
    }
    this.http.delete(`http://localhost:3001/api/delete-book/${this.bookname}`).subscribe(response=>{
     //alert(this.bookname+"Book deleted...");
     this.successMessage=`${this.bookname} successfully deleted`;
     this.errorMessage = '';
     this.bookname='';
     this.fetchBooks()
    },
    error => {
      console.error('Error deleting book:', error);

      if (error.status === 404) {
        this.errorMessage = `The book "${this.bookname}" does not exist`;
      } else {
        this.errorMessage = 'An error occurred while deleting the book';
      }

      this.successMessage = ''; // Clear any previous success messages
    }
    )
  }
  getBook(): void {
    if (!this.bookname) {
      console.error('Book name is undefined or empty');
      return;
    }

    this.http.get(`http://localhost:3001/api/get-book-details/${this.bookname}`).subscribe(
      (response: any) => {
        this.bookDetails = response;
      },
      (error) => {
        console.error('Error fetching book details:', error);
        this.bookDetails = null;
        this.fetchbook=`${this.bookname} This book is not available!!`
      }
    );
  }

  onUpdate(): void {
    if (!this.bookDetails) {
      console.error('Book details are undefined or empty');
      return;
    }

    const updateUrl = `http://localhost:3001/api/update-book/${this.bookDetails.bookname}`;

    this.http.put(updateUrl, this.bookDetails).subscribe(
      (response: any) => {
        console.log('Book updated successfully:', response);
        this.fetchbook=`${this.bookname} This book is updated successfully...`
        // Optionally, you can update your UI or perform additional actions
        this.bookDetails='';
        this.bookname='';
        this.fetchBooks();
      },
      (error) => {
        console.error('Error updating book:', error);
        // Handle the error, e.g., show a message to the user
      }
    );
  }

}
