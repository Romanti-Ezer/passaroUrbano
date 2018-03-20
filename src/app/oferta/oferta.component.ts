import { Component, OnInit, OnDestroy } from '@angular/core'
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { ActivatedRoute } from '@angular/router'
import { Params } from '@angular/router/src/shared'

import { CurrencyPipe } from '@angular/common'
import { LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/Rx'

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService, { provide: LOCALE_ID, useValue: 'pt-BR'} ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public tempoObservableSubscription: Subscription
  public meuObservableSubscription: Subscription  

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

  
    let tempo = Observable.interval(2000)

    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })
    

    // Observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<string>) => {
      observer.next('Primeiro evento da stream')
      observer.next('Segundo evento da stream')
      observer.complete()
      observer.next('Vrayy')
    })

    // Observable (observador)
    this.meuObservableSubscription = meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado),
      (erro: string) => console.log(erro),
      () => console.log('A stream de eventos foi finalizada')
    )
  }

  ngOnDestroy() {
    this.meuObservableSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
  }

}
