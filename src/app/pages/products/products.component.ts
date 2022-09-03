import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    productsCount: number = 10;
    productByName: any = "";
    products: any;

    upload: any = "";
    imgUploads: any;

    id: any;
    name: any;
    price: any;
    rooms: any;
    city: any;
    type: any;
    description: any;
    address: any;
    image: any;

    constructor( private router: Router, public route: ActivatedRoute, private http:HttpClient){

        // this.http.get('http://angular-real-estate-back.herokuapp.com/read')
        // // this.http.get('http://localhost:4000/read')
        //     .toPromise()
        //     .then( (data) => {
        //         // this.products = data;
        //         this.products = data.reverse();
        //         console.log("this.products => ", this.products);
        //     });
        this.readProducts();
    }

    ngOnInit(): void {}

    loadMore = () => {
      this.productsCount = this.productsCount + 10;
    }

    showAll = () => {
      this.productsCount = this.products.length;
    }

    clearSearch(){
        this.rooms = "";
        this.city = "";
        this.type = "";
    }

    readProducts = async () => {
        try{
            await fetch("http://angular-real-estate-back.herokuapp.com/read")
            // await fetch("http://localhost:4000/read")
              .then( response => response.json() )
              .then( data => {
                  // this.products = data;
                  this.products = data.reverse();


                  // sort products here

                  console.log("products.json => ", this.products)
            });
        }catch(error){}
    }

    readProductsReverse = async () => {
      try{
          await fetch("http://angular-real-estate-back.herokuapp.com/read")
          // await fetch("http://localhost:4000/read")
            .then( response => response.json() )
            .then( data => {
                // this.products = data.reverse();
                this.products = data;

                // sort products here

                console.log("products.json => ", this.products)
          });
      }catch(error){}
  }


    // Deletes product by id in Rest API
    deleteProduct = async (id:string) => {
        try{
            await fetch(`http://angular-real-estate-back.herokuapp.com/delete/${id}`, {
            // await fetch(`http://localhost:4000/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                    id: this.id,
                })
            });
            this.router.navigate(['/products']);

            }catch(err){
                console.error(err);
        }
    }

    // Returns specfic product object
    searchProduct = async (city:string) => {
        console.log("searchProduct");
        console.log("name =>", city);

        let productByName = this.products.find( product => {
            return product.city === city;
        });

        console.log("productByName", productByName);
        productByName ? true : false;
    }


    // Create new property
    // createProperty = async (address:string, price:string, city:string, type:string, rooms:string, description:string, image:string) => {
    createProperty = async ( address:string, city:string, price:string, description:string, rooms:string, type:string, image:string ) => {
        console.log("createProperty()");

        try{
            this.id = Math.floor(Math.random() * 10000000000000000);

            await fetch(`http://angular-real-estate-back.herokuapp.com/create`, {
            // await fetch(`http://localhost:4000/create`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                    id: this.id,
                    city: this.city,
                    name: this.address,
                    type: this.type,
                    description: this.description,
                    rooms: this.rooms,
                    price: this.price,
                    images: `http://angular-real-estate-back.herokuapp.com/assets/${this.image}`                })
            });
            // images: `http://angular-real-estate-back.herokuapp.com/assets/${this.image}`
            // images: `http://localhost:4000/assets/${this.image}`


            this.readProducts();
            this.router.navigate(['/products']);

            }catch(err){
                console.error(err);
      }
  }


  fileSelected = async ( event ) => {
      console.log("file target = ", event.target);
      console.log("file name = ", event.target.files[0].name);

      // Preview image
      let reader = new FileReader();
      reader.readAsDataURL( event.target.files[0] );

      reader.onload = ( event:any ) => {
          console.log("event.target = ", event.target);

          // Assign to preview image src
          this.upload = reader.result;
      }



      const formData = new FormData();
      formData.append( 'image', event.target.files[0], event.target.files[0].name );

      this.imgUploads = event.target.files[0].name;

      try{
        await fetch(`http://angular-real-estate-back.herokuapp.com/upload`, {
        // await fetch(`http://localhost:4000/upload`, {
            method: 'POST',
            body: formData
        });
      }catch(err){
          console.error(err);
      }


      // this.http.post('http://localhost:4000/upload', formData, { observe: 'response' })
      //     .subscribe( (response) => {
      //         if (response.status === 200) {
      //             // this.upload = response;
      //             console.log("HTTP response = ", response)
      //             let successResponse = this.upload.body.message;
      //         }
      //         else{
      //             console.log("There has been an error, response = ", response);
      //         }
      //     }
      // );


  }

}



