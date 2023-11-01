import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    axios.get('http://localhost:3000/productos')
      .then(response => {
        this.productos = response.data;
      });
  }

  navigateToDetalleProducto(producto: any) {
    this.router.navigate(['/producto', producto.nombre], { state: { producto } });
  }
}
