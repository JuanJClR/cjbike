import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    const data = { name: this.name, email: this.email, password: this.password };

    axios.post('http://localhost:3000/register', data)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  }
}
