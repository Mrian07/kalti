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
const TOKEN_KEY = 'access_token';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user: Observable<any>;
	private userData = new BehaviorSubject(null);
	jwtHelper: any;
	userInfo: any;
	TOKEN_KEY: string;
	token: any;
	API_URL = 'https://ds.kaltimprov.go.id/api/'; 

	constructor (
		private storage: Storage,
		private http: HttpClient,
		private plt: Platform,
		private router: Router
	) {
		this.loadStoredToken();
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
		

		// replicate a backend auth service. JWT token does not actually use the random user data - this is to be corrected.
		/*return this.http.get('https://ds.kaltimprov.go.id/api/profil').pipe(
			take(1),
			map((res) => {
				console.log(res);
				// tslint:disable-next-line: max-line-length
				//this.storage.set('token');
			}),
			switchMap((token) => {
				const decoded = helper.decodeToken(TOKEN_KEY);
				console.log('login decoded: ', decoded);
				this.userData.next(decoded);

				const storageObs = from(this.storage.set(TOKEN_KEY, token));
				return storageObs;
			})
		);*/
		return this.http.post("https://ds.kaltimprov.go.id/api/login",credentials).pipe(
			map((response:any)=>{
			console.log(response);
			this.storage.set('access_token',response.token);
			const decoded = helper.decodeToken(response.token);
			this.userData.next(decoded);
			console.log(decoded);
			return true;
			})
		)};

	getprofile() {
		return this.userData.getValue();
	}


	logout() {
		this.storage.remove(TOKEN_KEY).then(() => {
			this.router.navigateByUrl('/');
			this.userData.next(null);
		});
		console.log('remove token');
	}
}
