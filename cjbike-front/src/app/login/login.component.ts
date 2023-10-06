import { Component, AfterViewInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string = '';
  password: string = '';

  onSubmit() {
    const data = {email: this.email, password: this.password };

    axios.post('http://localhost:3000/login', data)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  }
}

