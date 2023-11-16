// productos.component.ts

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { CarritoService } from '../cart/cart.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];

  constructor(private router: Router, private carritoService: CarritoService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    axios.get('http://localhost:3000/productos')
      .then(response => {
        this.productos = response.data;
      });
  }

  addToCart(producto: any): void {
    const cantidad = 1; // Puedes establecer la cantidad predeterminada o permitir al usuario elegir
  
    // Modificación aquí: Agrega la cantidad al objeto del producto
    const productoConCantidad = { ...producto, cantidad };
  
    this.carritoService.agregarAlCarrito(productoConCantidad);
    window.alert('Producto añadido al carrito');
  }
  

  navigateToDetalleProducto(producto: any) {
    this.router.navigate(['/producto', producto.nombre], { state: { producto } });
  }
}
