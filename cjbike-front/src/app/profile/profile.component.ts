import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  nombreUsuario: string | null = null;
  email: string | null = null;
  phoneNumber: string | null = null;
  address: string | null = null;
  neighborhood: string | null = null;
  city: string | null = null;

  constructor(private authService: AuthService) {}

  guardarPerfilEditado() {
    const datosPerfilEditado = {
      nombreUsuario: this.nombreUsuario,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      neighborhood: this.neighborhood,
      city: this.city,
      // Otros datos que desees enviar al servidor
    };

    console.log(this.nombreUsuario)

    this.authService.guardarPerfilEditado(datosPerfilEditado)

      .subscribe({
        next: (response) => {
          console.log('Perfil editado con éxito:', response);
          console.log(this.nombreUsuario)
          if (response.message === 'Perfil de usuario editado con éxito') {
            // Después de editar el perfil con éxito, cargar el perfil actualizado
            this.loadUserProfile(); // Cargar los datos actualizados del perfil aquí
          }
        },
        error: (error) => {
          console.error('Error al editar el perfil:', error);
          // Manejo de errores
        }
      });
  }

  loadUserProfile() {
    // Cargar el perfil actualizado después de editar
    this.authService.checkAuthStatus();
    this.nombreUsuario = this.authService.nombreUsuario;
    this.email = this.authService.email;
    this.phoneNumber = this.authService.phoneNumber;
    this.address = this.authService.address;
    this.neighborhood = this.authService.neighborhood;
    this.city = this.authService.city;
  }

  ngOnInit() {
    this.loadUserProfile(); // Cargar los datos del perfil al inicializar el componente

    //autorizacion
    this.authService.checkAuthStatus();
    // Asignar valores del servicio a las propiedades del componente
    this.nombreUsuario = this.authService.nombreUsuario;
    this.email = this.authService.email;
    this.phoneNumber = this.authService.phoneNumber;
    this.address = this.authService.address;
    this.neighborhood = this.authService.neighborhood;
    this.city = this.authService.city;
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada con éxito');
  }
}
