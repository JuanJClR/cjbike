import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  user: User | null = null;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
}
