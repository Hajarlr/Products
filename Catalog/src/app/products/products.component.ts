import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../Model/products';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products !: Array<Products>;
  currentpage :number =0;
  pageSize:number = 5;
  totalPages :number =0;
  errorMessage !: string;
  SearchFormGroup !: FormGroup;
  curentAction :string="";

  constructor(private productService : ProductsService, private fb :FormBuilder){}

  ngOnInit(): void {

    this.SearchFormGroup=this.fb.group({
      keyword : this.fb.control(null)
    });
   this.handleGetPageProducts();
  }
  handleGetAllProducts(){
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products=data;
      },
      error : (err)=> { this.errorMessage=err},
      complete : ()=> { }
    });
  }
  handleGetPageProducts(){
    this.productService.getPage(this.currentpage, this.pageSize).subscribe({
      next: (data) => {
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error : (err)=> { this.errorMessage=err},
      complete : ()=> { }
    });
  }
  handleDeleteProduct(p:Products){
  let conf =confirm("Etes vous sur de vouloir supprimer ?");
  if (conf==false) return;
   this.productService.deleteProduct(p.id).subscribe({
    next : (data)=>{
      let index=this.products.indexOf(p);
      this.products.splice(index,1);
    }
   })
  }
  handleSetPromotion(p :Products){
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:()=> {
        p.promotion=!promo;
      },
      error:(err)=> {
        this.errorMessage=err;
      }
    })
  }
  handleSearchProducts(){
    this.curentAction="search";
    this.currentpage=0;
    let keyword=this.SearchFormGroup.value.keyword;
    this.productService.searchProducts(keyword,this.currentpage,this.pageSize).subscribe({
      next : (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      }
    })
  }
  gotoPage(i : number){
    this.currentpage=i;
    if(this.curentAction=='all')
    this.handleGetPageProducts();
  else
  this.handleSearchProducts();
  }
}
