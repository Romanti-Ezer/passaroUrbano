import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

import { CurrencyPipe } from '@angular/common'
import { LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService, { provide: LOCALE_ID, useValue: 'pt-BR' } ] 
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Oferta>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertas()
      .then(
        ( ofertas: Oferta[]) => { 
          this.ofertas = ofertas }
      )
      .catch(
        ( param: any) => console.log( param )
      )
    }
}
