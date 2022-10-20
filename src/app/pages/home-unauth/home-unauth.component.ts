import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-unauth',
  templateUrl: './home-unauth.component.html',
  styleUrls: ['./home-unauth.component.scss']
})
export class HomeUnauthComponent implements OnInit {
  imgSrc1 = 'https://media.istockphoto.com/photos/dog-waiting-for-feeding-picture-id1159049945?k=20&m=1159049945&s=612x612&w=0&h=RExfV2HAuXNj8Pnx8tFTxc96kK3X4WGScvMwapnKsVw='
  imgSrc2 = 'https://www.petmd.com/sites/default/files/styles/article_image/public/2021-01/cute-small-dog-lying-on-floor-beside-bowl-of-food.jpg?itok=qsN-Fe24'
  imgSrc3 = 'https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-eating-quirks.jpg?itok=3nG7zJou'

  constructor() { }

  ngOnInit(): void {
  }

}
