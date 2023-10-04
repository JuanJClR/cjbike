import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes que deseas usar en las rutas
import { HomeComponent } from './home/home.component'; // Asegúrate de tener el componente "Home" importado

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la página principal (puedes cambiarla a tu componente principal)
  // Agrega más rutas según tus necesidades
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
