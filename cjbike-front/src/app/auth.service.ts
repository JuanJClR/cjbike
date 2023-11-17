// auth.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  usuarioAutenticado = false;
  nombreUsuario: string | null = null
  email: string | null = null
  phoneNumber: string | null = null;
  address: string | null = null
  neighborhood: string | null = null
  city: string | null = null

  constructor(private http: HttpClient) {}

  guardarPerfilEditado(datosPerfil: any) {
    const url = 'http://localhost:3000/editarperfil'; // Ruta del servidor Express

    // Suponiendo que se envían los datos como un objeto JSON
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(url, datosPerfil, httpOptions);
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.name && decodedToken.email) {
        this.usuarioAutenticado = true;
        this.nombreUsuario = decodedToken.name;
        this.email = decodedToken.email;
        this.phoneNumber = decodedToken.phoneNumber;
        this.address = decodedToken.address;
        console.log(this.phoneNumber)
        this.neighborhood = decodedToken.neighborhood;
        this.city = decodedToken.city; // Corrección aquí
      }
    } else {
      this.usuarioAutenticado = false;
      this.nombreUsuario = null;
      this.email = null;
    }
  }

  handleSuccessfulLogin(response: any) {
    localStorage.setItem('token', response.token);
    this.checkAuthStatus();
  }

  logout() {
    localStorage.removeItem('token');
    this.usuarioAutenticado = false;
    this.nombreUsuario = null;
  }

  setNombreUsuario(nombreUsuario: string) {
    this.nombreUsuario = nombreUsuario;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setNeighborhood(neighborhood: string) {
    this.neighborhood = neighborhood;
  }

  setCity(city: string) {
    this.city = city;
  }
}
