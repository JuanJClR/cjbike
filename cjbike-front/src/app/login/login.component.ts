import { Component, AfterViewInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    const data = { email: this.email, password: this.password };

    axios.get('http://localhost:3000/login', { params: data })
      .then(response => {
        const userData = response.data;
        console.log('Respuesta del servidor:', userData);

        // Utilizar el nombre del usuario
        const nombreUsuario = userData.nombre;
        window.alert(`Bienvenido, ${nombreUsuario}!`);

        // Navegar a la página de inicio, por ejemplo
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error al enviar la solicitud:', error);
      });
  }
}
