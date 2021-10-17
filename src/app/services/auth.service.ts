import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { switchMap, map, take, timeout, tap } from 'rxjs/operators';

// buat instance jwt
const helper = new JwtHelperService();
const TOKEN_KEY = 'token';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user: Observable<any>;
	private userData = new BehaviorSubject(null);
	private result: Object;
	jwtHelper: any;
	TOKEN_KEY: string;
	token: any;
	API_URL = 'https://ds.kaltimprov.go.id/api/'; 
	id: any = [];
	users: any = [];
	constructor (
		private storage: Storage,
		private http: HttpClient,
		private plt: Platform,
		private router: Router,
		
	) {
		this.loadStoredToken();
		this.getDashboard();
		
	}

	async loadStoredToken() {
		await this.storage.create();
		const platformObs = from(this.plt.ready());

		this.user = platformObs.pipe(
			switchMap(() => {
				return from(this.storage.get(TOKEN_KEY));
			}),
			map((token) => {
				console.log('token from storage: ', token);
				if (token) {
					const decoded = helper.decodeToken(token);
					console.log('decoded: ', decoded);
					this.userData.next(decoded);
					return true;
				} else {
					return null;
				}
			})
		);
	}

	login(credentials: { email: string; password: string }): Observable<any> {
		if (
			credentials.email !== 'user@ds' ||
			credentials.password !== '12341234'
			
		) {
			return of(null);
			
		}
		
		return this.http.post("https://ds.kaltimprov.go.id/api/login",credentials).pipe(
			map((response:any)=>{
			console.log(response);
			this.storage.set('token',response.token);
			const decoded = helper.decodeToken(response.token);
			this.userData.next(this.users);
			console.log(decoded);
			
			return true;
			})
		)};

		async getDashboard() {
			var token = await this.storage.get(TOKEN_KEY);
			return new Promise((resolve, reject) => {
			  this.http.get('https://ds.kaltimprov.go.id/api/profil', {
				headers: {
				  "Authorization": "Bearer " + token
				}
			  })
			  .subscribe(data =>
				{
				console.log (data)
		 		});
			});
		  }


	logout() {
		this.storage.remove(TOKEN_KEY).then(() => {
			this.router.navigateByUrl('/');
			this.userData.next(this.user);
		});
		console.log('remove token');
	}
}