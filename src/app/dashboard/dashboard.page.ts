import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user = null;
  Username:any;
  constructor(
    private auth: AuthService
  ) {} 
  ionViewWillEnter() {
		this.user = this.auth.getprofile();
    let dataStorage=JSON.parse(localStorage.getItem(this.auth.TOKEN_KEY));
    this.user=dataStorage.data.user;
	}
  logout() {
		this.auth.logout();
	}
  ngOnInit() {
  }

}
