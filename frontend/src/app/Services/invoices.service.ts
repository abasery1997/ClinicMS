import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../Components/Model/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http:HttpClient) { }

  url:string='http://localhost:8080/invoicesreports';
  getAllInvoices(){
    return this.http.get<Invoice[]>(this.url);
  }
}
