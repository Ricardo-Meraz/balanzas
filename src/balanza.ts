type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
  id: number;
  monto: number;
  descripcion: string;
  tipo: TipoTransaccion;
}

class GestorTransacciones {
  private transacciones: Transaccion[] = [];

  agregarTransaccion(monto: number, descripcion: string, tipo: TipoTransaccion) {
    if (monto <= 0) {
      alert("El monto debe ser positivo.");
      return;
    }
    if (!descripcion.trim()) {
      alert("La descripción no puede estar vacía.");
      return;
    }
    
    if (tipo === "gasto" && monto > this.calcularBalance()) {
      alert("No puedes gastar más de lo que tienes disponible.");
      return;
    }

    const nuevaTransaccion: Transaccion = {
      id: Date.now(),
      monto: Math.abs(monto),
      descripcion,
      tipo,
    };

    this.transacciones.push(nuevaTransaccion);
    this.actualizarUI();
  }

  calcularBalance(): number {
    return this.transacciones.reduce((acc, transaccion) => {
      return transaccion.tipo === "ingreso" ? acc + transaccion.monto : acc - transaccion.monto;
    }, 0);
  }

  actualizarUI() {
    const listaTransacciones = document.getElementById("lista-transacciones");
    const balanceTotal = document.getElementById("balance-total");

    if (listaTransacciones && balanceTotal) {
      listaTransacciones.innerHTML = this.transacciones
        .map(
          (t) => `<li style="color: ${t.tipo === "ingreso" ? "green" : "red"}">
                    ${t.descripcion}: $${t.monto.toFixed(2)} (${t.tipo})
                  </li>`
        )
        .join("");
      balanceTotal.textContent = `Balance: $${this.calcularBalance().toFixed(2)}`;
    }
  }
}

const gestor = new GestorTransacciones();

document.getElementById("btn-ingreso")?.addEventListener("click", () => {
  const monto = Math.abs(parseFloat((document.getElementById("monto") as HTMLInputElement).value));
  const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
  gestor.agregarTransaccion(monto, descripcion, "ingreso");
});

document.getElementById("btn-gasto")?.addEventListener("click", () => {
  const monto = Math.abs(parseFloat((document.getElementById("monto") as HTMLInputElement).value));
  const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
  gestor.agregarTransaccion(monto, descripcion, "gasto");
});
