import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo producto
  public createProduct(data: {title: string, image_url: string}) {
    return this.firestore.collection('products').add(data);
  }
  //Obtiene un producto
  public getProduct(documentId: string) {
    return this.firestore.collection('products').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los producto
  public getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }
  //Actualiza un producto
  public updateProduct(documentId: string, data: any) {
    return this.firestore.collection('products').doc(documentId).set(data);
  }

  //Borra un gato
  public deleteProduct(documentId: string) {
    return this.firestore.collection('products').doc(documentId).delete();
  }
}
