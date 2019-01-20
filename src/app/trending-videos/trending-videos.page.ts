import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrendingService } from 'src/app/services/trending-service';
import { AccountsService } from '../services/account-service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

class TrendingModel {
  constructor(
    public imageName?: string,
    public videoUrl?: string,
    public videoTitle?: boolean,
    public _id?: any
  ) {
  }
}
@Component({
  selector: 'app-trending-videos',
  templateUrl: './trending-videos.page.html',
  styleUrls: ['./trending-videos.page.scss'],
})
export class TrendingVideosPage implements OnInit {
  videoUrl1: string;
  videoUrl2: string;
  videoUrl3: string;
  trendingList: TrendingModel[];
  isAdmin: boolean;
  constructor(
    public accountsService: AccountsService,
    public trendingService: TrendingService,
    private router: Router,
    private youtube: YoutubeVideoPlayer) {
      this.trendingList = [];
  }

  ngOnInit() {
    this.videoUrl1 = 'https://www.youtube.com/embed/MTXXMDfIicA?rel=0';
    this.videoUrl2 = 'https://www.youtube.com/embed/otAcYFVFE7k';
    this.videoUrl3 = 'https://www.youtube.com/embed/HS8Df6ngZ24';
    if (this.accountsService && this.accountsService.getLoginInfo() && this.accountsService.getLoginInfo().userName === 'srinath440') {
      this.isAdmin = true;
    }
    this.getTrendings();
  }

  getTrendings() {
    this.trendingService.getAllTrendingsList().then((data: TrendingModel[]) => {
      this.trendingList = data;
    });
  }

  updateTrendingDetails(trending) {
    this.router.navigate(['update-trending-videos', trending._id]);
  }
  deleteTrending(trending) {
    this.trendingService.deleteTrending(trending).then((deleteObj: any) => {
      this.getTrendings();
    });
  }

  playVideo(url) {
    this.youtube.openVideo(url);
  }
}
