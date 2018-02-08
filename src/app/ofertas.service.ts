import { Http } from '@angular/http'
import { Injectable} from '@angular/core'
import { Oferta } from './shared/oferta.model'

@Injectable()
export class OfertasService {

    constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get('http://localhost:3000/ofertas?destaque=true')
            .toPromise()
            .then((resposta: any) => resposta.json())
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