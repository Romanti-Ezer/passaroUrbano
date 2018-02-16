import { Component, OnInit } from '@angular/core'
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { ActivatedRoute } from '@angular/router'
import { Params } from '@angular/router/src/shared'
import { CurrencyPipe } from '@angular/common'

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

    this.idOferta = this.route.snapshot.params['id']
    this.ofertasService.getOferta(this.idOferta)
      .then((oferta: any) => {
        this.oferta = oferta
        console.log(this.oferta)
      })
      .catch((param: any) => console.log(param))
  }

}
