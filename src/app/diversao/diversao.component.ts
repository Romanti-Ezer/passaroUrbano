import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

import { CurrencyPipe } from '@angular/common'
import { LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [ OfertasService, { provide: LOCALE_ID, useValue: 'pt-BR' } ]
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('diversao')
      .then(( ofertas: any ) => this.ofertas = ofertas)
  }

}
