import { Injectable } from '@angular/core';
import { Observable, of, throwError, throwIfEmpty } from 'rxjs';
import { PageProduct, Products } from '../Model/products';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private products !: Array<Products>
  constructor() {
    this.products=[
      {id : UUID.UUID() , name : "Computer" , price : 6500,promotion : true},
      {id : UUID.UUID(), name : "Printer" , price : 3000,promotion : true},
      {id :UUID.UUID(), name : "Smart phone" , price : 1500,promotion : false},
      
    ];
    for(let i=0;i<10;i++){
      this.products.push( {id : UUID.UUID() , name : "Computer" , price : 6500,promotion : true});
      this.products.push( {id : UUID.UUID() , name : "Computer" , price : 6500,promotion : true});
      this.products.push( {id :UUID.UUID(), name : "Smart phone" , price : 1500,promotion : false});
    }
   }

   public getAll() : Observable<Products[]>{
    return of(this.products);
   }
   public getPage(page :number ,size: number) : Observable<PageProduct>{
    let index = page*size;
    let totalPages =~~(this.products.length / size);
    if(this.products.length % size != 0) 
      totalPages++;
    let PageProduct=this.products.slice(index, index+size);
    return of({page:page, size:size, totalPages:totalPages, products:PageProduct});
     
   }
   public deleteProduct(id :string) :Observable<boolean> {
   this.products =this.products.filter( p=>p.id!=id );
    return of(true);
   }
   public setPromotion(id : string):Observable<boolean>{
    let product=this.products.find(p=> p.id==id);
    if (product != undefined){
      product.promotion=!product.promotion;
      return of(true);
    }else return throwError(()=>new Error("Product not found"));
    
   }
   public searchProducts(keyword:string ,page:number,size:number) : Observable<PageProduct>{
    let result =this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages =~~(result.length / size);
    if(this.products.length % size != 0) 
      totalPages++;
    let PageProduct=result.slice(index, index+size);
    return of({page:page,size:size,totalPages:totalPages,products:PageProduct});
   }
}
