import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'

import { URL_API } from './app.api'

import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators/map'

@Injectable()
export class OfertasService {

    constructor(private http: Http) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
            .catch((resposta: any) => console.log('Erro ao buscar oferta: ', resposta))
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
            .catch((resposta: any) => console.log('Erro ao buscar oferta: ', resposta))
    }

    public getOferta(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas/${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
            .catch((resposta: any) => console.log('Erro ao buscar oferta: ', resposta))
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0].descricao )
            .catch((resposta: any) => console.log('Erro ao buscar como usar: ', resposta))
    }

    public getOndeFicaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0].descricao)
            .catch((resposta: any) => console.log('Erro ao buscar onde fica: ', resposta))
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .retry(10)
            .map((resposta: Response) => resposta.json())
    }

    /*public getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            let deu_certo = true
            if (deu_certo) {
                setTimeout(() => resolve( this.ofertas ), 3000)
            } else {
                reject( { codigo_erro: 404, mensagem_erro: 'Not found!'} )
            }
            
        })
        .then(( ofertas: Oferta[]) => {
            console.log('Esse é o then da Promise')
            return ofertas
        })
        .then(( ofertas: Oferta[]) => {
            console.log('Esse é o segundo then da Promise')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => { resolve2( ofertas )} ,3000)
            })
        })
        .then(( ofertas: Oferta[]) => {
            console.log('Terceiro then, sendo executado 3 segundos depois da segunda Promise')
            return ofertas
        })
    }
    */
}