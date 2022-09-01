import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    productInfo: any;
    products: any;
    product: any;

    id: any;
    city: any;
    name: any;
    type: any;
    rooms: any;
    price: any;
    description: any;
    error: string = "";

    ngOnInit(): void{}
    ngOnDestroy(): void{}
    ngOnChanges(): void{}

    constructor( private router: Router, public route: ActivatedRoute ){
        try{
          fetch(`http://angular-real-estate-back.herokuapp.com/read/${this.route.snapshot.paramMap.get('id')}`)
          // fetch(`http://localhost:4000/read/${this.route.snapshot.paramMap.get('id')}`)
              .then( response => response.json() )
              .then( data => {
                  this.productInfo = data;

                  console.log("this.productInfo = ", this.productInfo);

                  this.city = this.productInfo.city;
                  this.name = this.productInfo.name;
                  this.type = this.productInfo.type;
                  this.rooms = this.productInfo.rooms;
                  this.price = this.productInfo.price;
                  this.description = this.productInfo.description;

                  console.log("this.city =>", this.city);

              });
        }catch(error){}

        // try{
        //     fetch("http://localhost:4000/read")
        //         .then( response => response.json() )
        //         .then( data => {
        //             this.products = data;
        //             console.log("products.json => ", this.products);
        //             this.productInfo = this.products.find( (product:any ) => {
        //                 return product.id === this.id;
        //             });
        //             this.city = this.productInfo.city;
        //             this.name = this.productInfo.name;
        //             this.type = this.productInfo.type;
        //             this.rooms = this.productInfo.rooms;
        //             this.price = this.productInfo.price;
        //             this.description = this.productInfo.description;
        //         });
        // }catch(error){}

        this.id = this.route.snapshot.paramMap.get('id');
    }

    // Update individual products with Node API
    updateProduct = async (city:string, name:string, type:string, rooms:string, price:string, description:string) => {

        if( !price || !rooms || !description || !type ){
            this.error = "*Type, price, description, and rooms are required";
            return;
        }
        else if( rooms.length >= 56 || type.length >= 56 ){
            this.error = "*Type, price, and rooms must be less than 56 characters";
            return;
        }
        else if( description.length >= 200 ){
          this.error = "*Description must be less than 200 characters";
          return;
      }
        else if( parseInt(price) <= 0 ){
            this.error = "*Price must be greater than 0";
            return;
        }
        this.error = "";

        try{
            await fetch(`http://angular-real-estate-back.herokuapp.com/update/${this.id}`, {
            // await fetch(`http://localhost:4000/update/${this.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                    id: this.id,
                    city: city,
                    name: name,
                    type: type,
                    description: description,
                    rooms: rooms,
                    price: price
                })
            });
            this.router.navigate(['/products']);

            }catch(err){
              console.error(err);
        }
    }


    deleteProduct = async (id:string) => {
        try{
          await fetch(`http://angular-real-estate-back.herokuapp.com/delete/${this.id}`, {
          // await fetch(`http://localhost:4000/delete/${this.id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id: this.id,
              })
          });
          console.log("re-direct /products");
          this.router.navigate(['/products']);

          }catch(err){
              console.error(err);
          }
    }
}



