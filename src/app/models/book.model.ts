export class Book  {
	photo: string;
	synopsis: string;
	
	constructor(public title: string, 
							public author: string, 
							public date: string,
							public memberAuthor: string) {
		// code...
	}
}