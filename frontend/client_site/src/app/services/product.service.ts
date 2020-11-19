import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from "../models/product";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:5000/api/products';
  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  // Get a product by id
  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  // Add a product
  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.productUrl, product, httpOptions);
  }

  // Update product by id
  updateProductById(product: Product, id: any): Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${id}`, product, httpOptions);
  }

  // Delete a product
  deleteProductById(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.productUrl}/${id}`);
  }

}