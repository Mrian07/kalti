import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  item: any;
  http: any;
  token: any;
  constructor(
    private auth: AuthService
  ) {} 
  ionViewWillEnter() {
		this.auth.getDashboard((data) => {
      this.user = data.user;
    });
	}

  logout() {
		this.auth.logout();
	}

  ngOnInit() {
  }
}
