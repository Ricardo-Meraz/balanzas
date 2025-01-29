"use strict";
var _a, _b;
class GestorTransacciones {
    constructor() {
        this.transacciones = [];
    }
    agregarTransaccion(monto, descripcion, tipo) {
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
        const nuevaTransaccion = {
            id: Date.now(),
            monto: Math.abs(monto),
            descripcion,
            tipo,
        };
        this.transacciones.push(nuevaTransaccion);
        this.actualizarUI();
    }
    calcularBalance() {
        return this.transacciones.reduce((acc, transaccion) => {
            return transaccion.tipo === "ingreso" ? acc + transaccion.monto : acc - transaccion.monto;
        }, 0);
    }
    actualizarUI() {
        const listaTransacciones = document.getElementById("lista-transacciones");
        const balanceTotal = document.getElementById("balance-total");
        if (listaTransacciones && balanceTotal) {
            listaTransacciones.innerHTML = this.transacciones
                .map((t) => `<li style="color: ${t.tipo === "ingreso" ? "green" : "red"}">
                    ${t.descripcion}: $${t.monto.toFixed(2)} (${t.tipo})
                  </li>`)
                .join("");
            balanceTotal.textContent = `Balance: $${this.calcularBalance().toFixed(2)}`;
        }
    }
}
const gestor = new GestorTransacciones();
(_a = document.getElementById("btn-ingreso")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const monto = Math.abs(parseFloat(document.getElementById("monto").value));
    const descripcion = document.getElementById("descripcion").value;
    gestor.agregarTransaccion(monto, descripcion, "ingreso");
});
(_b = document.getElementById("btn-gasto")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const monto = Math.abs(parseFloat(document.getElementById("monto").value));
    const descripcion = document.getElementById("descripcion").value;
    gestor.agregarTransaccion(monto, descripcion, "gasto");
});
