import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service' 
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public ofertas2: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) // Para executar a ação do switchMap após 1 segundo
      .distinctUntilChanged() // Para fazer pesquisas distintas
      .switchMap((termo: string) => {
        if (termo === '') {
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo)
      })

      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([])
      })
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      this.ofertas2 = ofertas
    })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }
}
