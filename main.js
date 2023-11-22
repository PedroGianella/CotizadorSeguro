document.addEventListener('DOMContentLoaded', function () {
    const cotizador = new CotizadorSeguros();

    const obtenerCotizacionBtn = document.getElementById('obtener-cotizacion');
    obtenerCotizacionBtn.addEventListener('click', () => cotizador.obtenerCotizacion());
});

class CotizadorSeguros {
    constructor() {
        this.resultado = document.getElementById('cotizacion');
        this.tiposSeguro = [
            {
                tipo: 'auto',
                factorEdad: 10,
                factoresCobertura: [
                    { cobertura: 'completa', factor: 50 },
                    { cobertura: 'basica', factor: 0 }
                ]
            },
            {
                tipo: 'hogar',
                factorEdad: 5,
                factoresCobertura: [
                    { cobertura: 'completa', factor: 30 },
                    { cobertura: 'basica', factor: 0 }
                ]
            },
            {
                tipo: 'vida',
                factorEdad: 2,
                factoresCobertura: [
                    { cobertura: 'completa', factor: 20 },
                    { cobertura: 'basica', factor: 0 }
                ]
            }
        ];

        this.cargarEventos();
    }

    cargarEventos() {
        // Verificar si hay datos almacenados en local storage y llenar el formulario si es necesario
        const tipoSeguroGuardado = localStorage.getItem('tipoSeguro');
        const edadGuardada = localStorage.getItem('edad');

        if (tipoSeguroGuardado && edadGuardada) {
            document.getElementById('tipo-seguro').value = tipoSeguroGuardado;
            document.getElementById('edad').value = edadGuardada;
        }
    }

    buscarTipoSeguro(tipo) {
        return this.tiposSeguro.find(seguro => seguro.tipo === tipo);
    }

    calcularSeguro(tipo, edad, cobertura) {
        const tipoSeguro = this.buscarTipoSeguro(tipo);

        let costoBase = 0;

        if (cobertura === 'basica') {
            costoBase = 500;
        } else if (cobertura === 'completa') {
            costoBase = 800;
        }

        if (edad < 25) {
            costoBase += costoBase * 0.2;
        } else if (edad > 40) {
            costoBase -= costoBase * 0.1;
        }

        const factorCobertura = tipoSeguro.factoresCobertura.find(factor => factor.cobertura === cobertura);

        let cotizacion = edad * tipoSeguro.factorEdad + factorCobertura.factor;

        return cotizacion;
    }

    mostrarResultado(cotizacion) {
        this.resultado.innerHTML = `
            <p>Tu cotización es: $${cotizacion}</p>
        `;
    }

    obtenerCotizacion() {
        const tipoSeguro = document.getElementById('tipo-seguro').value;
        const edad = parseInt(document.getElementById('edad').value);
        const cobertura = document.querySelector('input[name="cobertura"]:checked').value;

        // Guardar valores en local storage
        localStorage.setItem('tipoSeguro', tipoSeguro);
        localStorage.setItem('edad', edad);

        const cotizacion = this.calcularSeguro(tipoSeguro, edad, cobertura);
        this.mostrarResultado(cotizacion);
    }
}
