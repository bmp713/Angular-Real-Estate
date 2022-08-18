import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    //products: Products[] = productsData;
    products: any = Observable<any>;

    productsCount: number = 10;
    productByName: any = "";

    rooms: string = "";
    city: string = "";
    type: string = "";
    id: string = "";

    constructor( private router: Router, public route: ActivatedRoute, private http:HttpClient){

        this.http.get('http://angular-real-estate-back.herokuapp.com/read')
        // this.http.get('http://localhost:4000/read')
            .toPromise()
            .then( (data) => {
                this.products = data;
                console.log("this.products => ", this.products);
            });

        // this.products = this.http.get('http://localhost:4000/read')
        // this.products.subscribe();

        console.log("this.products => ", this.products);
    }

    ngOnInit(): void {}

    loadMore = () => {
      this.productsCount = this.productsCount + 10;
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
                  this.products = data;
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

}



