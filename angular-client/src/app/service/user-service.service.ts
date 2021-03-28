import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  private userUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/user';
  }

  public findAllUsers(): Observable<User[]> {
    const allUsersUrl = 'http://localhost:8080/allUsers' 
    return this.http.get<User[]>(allUsersUrl);
  }
  
  public getUser(id: number): Observable<User> {
     const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(

      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  public addUser(user: User) {
    return this.http.post<User>(this.userUrl, user).pipe(
      
      tap(_ => console.log(`add user`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  public updateUser(id: number, user: User): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(

      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  public deleteUser(id: number): Observable<User> {
    const deleteUserUrl = 'http://localhost:8080/delete/user';
    const url = `${deleteUserUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    const usersUrl = 'http://localhost:8080/users' 
    return this.http.get<User[]>(`${usersUrl}/?search=name:${term}`).pipe(
      tap(x => x.length ?
         console.log(`found users matching "${term}"`) :
         console.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
