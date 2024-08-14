import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion-beca',
  templateUrl: './informacion-beca.component.html',
  styleUrl: './informacion-beca.component.css'
})
export class InformacionBecaComponent implements OnInit {
  StudentArray: any[] = [];
  isResultLoaded = false;

  constructor(private http: HttpClient) {
   
  }

  ngOnInit(): void {

    
  }

  getAllStudent() {
    this.http.get("http://localhost:3000/solicitudes")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
      });
      console.log(this.StudentArray)
  }

}


