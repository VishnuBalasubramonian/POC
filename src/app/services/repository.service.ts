import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, pipe} from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { TestScript } from '../models/testscript.model';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  public apiUrl:string = "http://ec2-13-232-44-184.ap-south-1.compute.amazonaws.com/api";
  
   constructor(private httpClient: HttpClient){
   }
   
   getRepositories():Observable<Repository[]>{
     return this.httpClient.get(this.apiUrl+'/Repository/GetAllRepository')
                .pipe(
                  map(res=>res as Repository[]),
                  catchError(this.errorHandle)
                );
   }

   getRepository(id:number):Observable<Repository>{
    return this.httpClient.get(this.apiUrl+'/Repository/GetRepositoryById/'+id)
    .pipe(
      map(res=>res as Repository),
      catchError(this.errorHandle)
    );
   }
    
   addRepository(repo:Repository){
       return this.httpClient.post(this.apiUrl+'/Repository/AddRepository',repo)
       .subscribe(
        data  => {
          console.log("POST Request is successful ", data);
          },
          error  => {
          console.log("Error", error);
          }
      );
    }

    updateRepository(id:number,repo:Repository){
      return this.httpClient.put(this.apiUrl+'/Repository/UpdateRepository/'+id,repo)
      .subscribe(
        data  => {
          console.log("PUT Request is successful ", data);
          },
          error  => {
          console.log("Error", error);
          }
      );
    }

    deleteRepository(id:number){
      return this.httpClient.delete(this.apiUrl+'/Repository/DeleteRepository/'+id)
      .subscribe(
        data  => {
          console.log("DELETE Request is successful ", data);
          },
          error  => {
          console.log("Error", error);
          }
      );
    }

   errorHandle(error:Response){
     console.log(error);
     return throwError(error);
   }
}