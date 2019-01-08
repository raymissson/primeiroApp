import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
 
})
export class FeedPage {
  public objetoFeed = {
    titulo:"Raymison Maklouf",
    data:"05 de janeiro de 1964",
    descricao:"Aplicativo para compras compartilhadas em que você usuário pode achar alguém para dividir a conta",
    qtdeLike: 10,
    qtdeComents: 5,
    timeComents:"1h atrás"
  }
  public loader;
  public refresher;
  public isRefreshering: boolean = false;
  public page = 1;
  public infiniteScroll;

  public lista_filmes = new Array<any>();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  doRefresh(refresher) {
    
    this.refresher = refresher;
    this.isRefreshering = true;
    this.carregarFilmes();
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1:number,num2:number): void{
    alert(num1+num2);
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumeros(10,99);
    this.carregarFilmes();
    
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando();
    this.movieProvider.getLetesMovies(this.page).subscribe(
      data=>{
        const response = (data as any);
        const objetoRetorno = JSON.parse(response._body);
        if(newpage){
          this.lista_filmes= this.lista_filmes.concat(objetoRetorno.results);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = objetoRetorno.results;
        }
        
        console.log(objetoRetorno);
        this.fechaCarregando();
        if(this.isRefreshering){
          this.refresher.complete();
          this.isRefreshering=false;
        }
      }, error=>{
        console.log(error);
        this.fechaCarregando();
        if(this.isRefreshering){
          this.refresher.complete();
          this.isRefreshering=false;
        }
      })
  }

}
