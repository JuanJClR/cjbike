import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})

export class SingleProductComponent {
  producto: any;

  constructor(private route: ActivatedRoute) {
    const state = history.state;
    if (state && state.producto) {
      this.producto = state.producto;
      // Ahora puedes usar this.producto para mostrar los detalles en tu plantilla HTML
    }
  }
}
