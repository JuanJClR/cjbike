import { Component, ChangeDetectorRef } from '@angular/core';
import { CarritoService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carrito: any[] = [];

  constructor(
    public carritoService: CarritoService,
    private changeDetectorRef: ChangeDetectorRef  // Agrega ChangeDetectorRef al constructor
  ) {
    this.carrito = carritoService.getCarrito();
  }

  removerDelCarrito(producto: any): void {
    this.carritoService.removerDelCarrito(producto);

    // Actualiza la variable local y fuerza la detección de cambios
    this.carrito = this.carritoService.getCarrito();
    this.changeDetectorRef.detectChanges();
  }
  
  calcularSubtotal(): number {
    // Lógica para calcular el subtotal
    const productos = this.carritoService.getCarrito();
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  calcularTotal(): number {
    // Lógica para calcular el total (puedes agregar el costo de envío aquí si es necesario)
    const subtotal = this.calcularSubtotal();
    return subtotal + 150; // Ejemplo de envío fijo
  }

  actualizarCantidad(producto: any): void {
    this.carritoService.actualizarCantidadEnCarrito(producto);
  }

  realizarPago(): void {
    // Lógica para procesar el pago (puedes redirigir a una página de pago externa, por ejemplo)
    console.log('Procesando pago...');
  }
}