import { Component, OnInit } from '@angular/core'
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { ActivatedRoute } from '@angular/router'
import { Params } from '@angular/router/src/shared'
import { CurrencyPipe } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/Rx'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta
  public idOferta: number

  constructor(private ofertasService: OfertasService, private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.route.params.subscribe((parametro: any) => {
      console.log(parametro)
    })*/

    /* Programação reativa, observable para o id da oferta
    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) },
      (erro: any) => console.log(erro),
      () => console.log('Processamento foi classificado como concluído!')
    )*/

    this.idOferta = this.route.snapshot.params['id']
    this.ofertasService.getOferta(this.idOferta)
      .then((oferta: any) => {
        this.oferta = oferta
        //console.log(this.oferta)
      })
      .catch((param: any) => console.log(param))

    /*
    let tempo = Observable.interval(2000)

    tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })
    */

    // Observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<string>) => {
      observer.next('Primeiro evento da stream')
      observer.next('Segundo evento da stream')
    })

    // Observable (observador)
    meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado)
    )
  }

}
