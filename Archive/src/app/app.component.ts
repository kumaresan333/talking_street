import { Component } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  isSearch: boolean;
  // data: any;
  searchedData: any;
  search: any = {};
  Address = 'Address';
  query;
  data: any ;
  // data = new Array(5).fill({}).map((i, index) => {
  //   return {
  //     href: 'http://ant.design',
  //     title: `ant design part ${index}`,
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  //   };
  // });

  constructor(public http: Http) {
    this.title = 'Dinner';
    this.getJSON();
  }

  getJSON() {
    this.http.get('assets/sample_data.json').subscribe(data => {
      this.data = data.json();
      this.data.forEach((element: any) => {
        element.map = `https://maps.google.com/?q=${element.lat},${element.long}`;
      });
    });
  }

  searchData() {
    // console.log(this.query)
    if(!this.data)return null;
    if(!this.query || !this.query.length)return this.data;
    const q = this.query.toLowerCase();
    return this.data.filter(function(item){
      return JSON.stringify(item.seo_desc).toLowerCase().includes(q) || 
      JSON.stringify(item.seo_keywords).toLowerCase().includes(q) || 
      JSON.stringify(item.address).toLowerCase().includes(q) ||
      JSON.stringify(item.cuisine).toLowerCase().includes(q);
  });
  //   if (this.search.string) {
  //     this.isSearch = true;
  //     this.searchedData = this.data.filter(ele => {
  //       return (
  //         ele.seo_keywords.includes(this.search.string) &&
  //         ele.location ? ele.location === this.search.location : null &&
  //         ele.location === this.search.cuisine
  //       );
  //     });
  //     console.log(this.searchedData, 'dataaa')
  //   } else {
  //     this.isSearch = false;
  //   }
  // }
}
