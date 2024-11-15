import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// Interface for User data structure
export interface User {
  userId: string;
  username: string;
  userphone: string;
  userplace: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000';  
  
  constructor(private http: HttpClient,private cookieService: CookieService) { }

  // create  new user
  addUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-user`, user,{ withCredentials: true });
  }

  // get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`,{ withCredentials: true });
  }

  // get  user by id
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${userId}`,{ withCredentials: true });
  }

  // update user
  updateUser(userId: string, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit-user/${userId}`, userData,{ withCredentials: true });
  }

  // delete user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-user/${userId}`,{ withCredentials: true });
  }
}