import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/firestore/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products = [];
  public documentId = null;
  public currentStatus = 1;
  public newProductForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image_url: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  constructor(
    private productService: ProductService
  ) {
    this.newProductForm.setValue({
      id: '',
      title: '',
      image_url: ''
    });
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((productData: any) => {
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      })
    });
  }

  public newProduct(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        title: form.title,
        image_url: form.image_url
      };
      this.productService.createProduct(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newProductForm.setValue({
          title: '',
          image_url: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        title: form.title,
        image_url: form.image_url
      };
      this.productService.updateProduct(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newProductForm.setValue({
          title: '',
          image_url: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
