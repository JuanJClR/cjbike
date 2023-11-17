import { Component, ChangeDetectorRef } from '@angular/core';
import { CarritoService } from './cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carrito: any[] = [];
  showSuccess: boolean = false;
  showCancel: boolean = false;
  showError: boolean = false;

  payPalConfig?: IPayPalConfig;

  constructor(
    public carritoService: CarritoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.carrito = carritoService.getCarrito();
    this.initConfig();
  }

  initConfig(): void {
    this.payPalConfig = {
      clientId: 'sb',
      createOrderOnClient: (data: any): ICreateOrderRequest => {
        const subtotal = this.calcularSubtotal();
        const envio = 150;

        return {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: (subtotal + envio).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: subtotal.toFixed(2),
                },
                shipping: {
                  currency_code: 'USD',
                  value: envio.toFixed(2),
                }
              }
            },
            items: this.carrito.map((producto) => {
              return {
                name: producto.nombre,
                quantity: producto.cantidad.toString(),
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: producto.precio.toFixed(2),
                },
                
              };
            })
          }]
        };
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data: any, actions: any) => {
        console.log('Transacción aprobada pero no autorizada', data, actions);
        actions.order.get().then((details: any) => {
          console.log('Detalles completos de la orden: ', details);
        });
      },
      onClientAuthorization: (data: any) => {
        console.log('Se debe informar al servidor sobre la transacción completada en este punto', data);
        this.showSuccess = true;
      },
      onCancel: (data: any, actions: any) => {
        console.log('Cancelado', data, actions);
        this.showCancel = true;
      },
      onError: (err: any) => {
        console.log('Error', err);
        this.showError = true;
      },
      onClick: (data: any, actions: any) => {
        console.log('Click', data, actions);
        this.resetStatus();
      }
    };
  }

  resetStatus(): void {
    this.showSuccess = false;
    this.showCancel = false;
    this.showError = false;
  }

  removerDelCarrito(producto: any): void {
    this.carritoService.removerDelCarrito(producto);
    this.carrito = this.carritoService.getCarrito();
    this.changeDetectorRef.detectChanges();
  }

  calcularSubtotal(): number {
    const productos = this.carritoService.getCarrito();
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const envio = 150; // Ejemplo de envío fijo
    return subtotal + envio;
  }

  actualizarCantidad(producto: any): void {
    this.carritoService.actualizarCantidadEnCarrito(producto);
  }

  realizarPago(): void {
    console.log('Procesando pago...');
  }
}
