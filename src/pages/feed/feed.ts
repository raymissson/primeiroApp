import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  public lista_filmes = new Array<any>();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider) {
  }

  public somaDoisNumeros(num1:number,num2:number): void{
    alert(num1+num2);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumeros(10,99);
    this.movieProvider.getLetesMovies().subscribe(
      data=>{
        const response = (data as any);
        const objetoRetorno = JSON.parse(response._body);
        this.lista_filmes = objetoRetorno.results;
        console.log(objetoRetorno);
      }, error=>{
        console.log(error);
      })
  }

}
