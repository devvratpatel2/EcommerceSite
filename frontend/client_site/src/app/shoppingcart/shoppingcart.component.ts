import { Item } from './../Item';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  items: Item[] = [];
  total: number = 0;
  checkingOut: boolean = false;
  formFullName: string;
  checkoutForm: FormGroup
  errors:any = [];
  notify: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

setEmptyCart():void {
  let cart: any = [];
  localStorage.setItem('cart', JSON.stringify(cart));
}

  ngOnInit():void {
    this.initForm();
    this.formFullName = "";
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {

        this.productService.getProductById(id).subscribe(result=>{
          var item: Item = {
            product: result,
            quantity: 1
          };
          if (localStorage.getItem('cart') == null) {
            let cart: any = [];
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let cart: any = JSON.parse(localStorage.getItem('cart'));
            let index: number = -1;
            for (var i = 0; i < cart.length; i++) {
              let item: Item = JSON.parse(cart[i]);
              if (item.product.code == id) {
                index = i;
                break;
              }
            }
            if (index == -1) {
              cart.push(JSON.stringify(item));
              localStorage.setItem('cart', JSON.stringify(cart));
            } else {
              let item: Item = JSON.parse(cart[index]);
              item.quantity += 1;
              cart[index] = JSON.stringify(item);
              localStorage.setItem("cart", JSON.stringify(cart));
            }
          }
          this.loadCart();
        })
				
			} else {
				this.loadCart();
			}
		});
  }
  
  loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidInput(fieldName): boolean {
    return this.checkoutForm.controls[fieldName].invalid &&
      (this.checkoutForm.controls[fieldName].dirty || this.checkoutForm.controls[fieldName].touched);
  }
  
  remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.code == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
  cartInfo:any;
  
	checkOut() {
    this.checkingOut = true;
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		this.cartInfo= cart;
		console.log(cart);
  }

  checkOutConfirm(fname, email, address) {
    if (fname.value==="" || email.value==="" || address.value==="") {
      alert("Please make sure all fields are filled.")
    } else {
      this.checkingOut = false;
      localStorage.removeItem('cart');
      this.loadCart();
    }
    
  }
  

}