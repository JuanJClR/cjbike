import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  productos: any[] = [];

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    axios.get('http://localhost:3000/productos')
      .then(response => {
        this.productos = response.data;
      });
  }
}
