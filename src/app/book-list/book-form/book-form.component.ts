import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

	bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private authService: AuthService, private formBulider: FormBuilder, private booksService: BooksService, private router: Router) { }

  ngOnInit() {
  	this.initForm();
    console.log('pseudo : '+this.authService.pseudo);
  }
  initForm(){
  	this.bookForm = this.formBulider.group({
  		title: ['', Validators.required],
  		author: ['', Validators.required],
  		synopsis: '',
      memberAuthor: this.authService.pseudo
  	});
	}	
	onSaveBook(){
		const formValue = this.bookForm.value;
    const date = new Date().toLocaleString();
    const newBook = new Book(formValue['title'], formValue['author'], date, this.authService.pseudo);
		newBook.synopsis = formValue['synopsis'];
    if(this.fileUrl && this.fileUrl !== ''){
      newBook.photo = this.fileUrl;
    }
		this.booksService.createNewBook(newBook);
		this.router.navigate(['/books']);
	}
  // permet de récuperer le fichier placé dans le champ de téléchargement
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
}
