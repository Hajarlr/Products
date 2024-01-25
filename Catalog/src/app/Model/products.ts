export class Products {
    id : string ="";
    name :string ="" ;
    price : number =0;
    promotion !: boolean;
}
 export class PageProduct{
    products !: Products[];
    page : number=0;
    size :number=0;
    totalPages : number=0;
 }