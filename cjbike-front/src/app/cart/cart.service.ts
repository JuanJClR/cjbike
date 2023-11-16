import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private key = 'carrito';

  getCarrito(): any[] {
    const carrito = localStorage.getItem(this.key);
    return carrito ? JSON.parse(carrito) : [];
  }

  agregarAlCarrito(producto: any): void {
    const carrito = this.getCarrito();
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
  
    if (index !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      carrito[index].cantidad += producto.cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito.push(producto);
    }
  
    localStorage.setItem(this.key, JSON.stringify(carrito));
  }
  

  eliminarDelCarrito(index: number): void {
    const carrito = this.getCarrito();
    carrito.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(carrito));
  }

  removerDelCarrito(producto: any): void {
    const carrito = this.getCarrito();
    const index = carrito.findIndex((item) => item.nombre === producto.nombre);
    if (index !== -1) {
      carrito.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(carrito));
    }
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.key);
  }

  actualizarCantidadEnCarrito(producto: any): void {
    const carrito = this.getCarrito();
    const productoEnCarrito = carrito.find((p: any) => p.nombre === producto.nombre);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad = producto.cantidad;
      localStorage.setItem(this.key, JSON.stringify(carrito));
    }
  }


  // Otros métodos del carrito según sea necesario
}
