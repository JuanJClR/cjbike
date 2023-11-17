// head.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuthStatus();
  }

  get usuarioAutenticado(): boolean {
    return this.authService.usuarioAutenticado;
  }

  get nombreUsuario(): string | null {
    return this.authService.nombreUsuario;
  }

  get email(): string | null {
    return this.authService.email;
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada con éxito');
  }
}
