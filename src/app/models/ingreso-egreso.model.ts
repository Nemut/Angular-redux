

export class IngresoEgreso {

  constructor(
    public descripcion: string,
    public monto: number,
    public tipo: string,
    public id?: string
  ) {}

  static fromApi( { descripcion, monto, tipo, id } ) {
    return new IngresoEgreso(descripcion, monto, tipo, id);
  }
  
}