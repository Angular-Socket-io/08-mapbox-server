export class Grafica{
    private pregunta: string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4' ];
    private valor: number[] = [0, 0, 0, 0];
    constructor(){
    }

    getDataGrafica(){
        return [{ data: this.valor, label: 'Preguntas'}]
    }

     incrementarValor( pregunta: string, valor: number ) {
        pregunta = pregunta.toLowerCase().trim();
        for( let i in this.pregunta ) {
            if ( this.pregunta[i].toLowerCase().trim() === pregunta ) {
                this.valor[i] += valor;
            }
        }
        return this.getDataGrafica();
    }

}