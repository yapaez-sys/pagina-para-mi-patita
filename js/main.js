/* =========================================================
   PARA MI PATITA 💜
   MAIN.JS — VERSIÓN FINAL
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const pantallaEntrada =
    document.getElementById("pantallaEntrada");

const fechaInput =
    document.getElementById("fechaInput");

const btnEntrada =
    document.getElementById("btnEntrada");

const errorFecha =
    document.getElementById("errorFecha");

const mensajeError =
    document.getElementById("mensajeError");

const contenedorFecha =
    document.getElementById("contenedorFecha");

const inicio =
    document.getElementById("inicio");

const canvas =
    document.getElementById("canvasCorazon");

const zonaCorazon =
    document.getElementById("zonaCorazon");

const botonCorazon =
    document.getElementById("botonCorazon");

const indicador =
    document.getElementById("indicador");

const sorpresa =
    document.getElementById("sorpresa");

const btnHistoria =
    document.getElementById("btnHistoria");

const primerViaje =
    document.getElementById("primerViaje");

const btnSiguiente =
    document.getElementById("btnSiguiente");

const seccion30Mayo =
    document.getElementById("seccion30Mayo");

const btnMemorias =
    document.getElementById("btnMemorias");

const seccionRecuerdos =
    document.getElementById("seccionRecuerdos");

const btnElla =
    document.getElementById("btnElla");

const seccionElla =
    document.getElementById("seccionElla");

const btnFinal =
    document.getElementById("btnFinal");

const seccionContador =
    document.getElementById("seccionContador");

const videoRecuerdo =
    document.getElementById("videoRecuerdo");


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

/*
 * La fecha NO aparece visualmente.
 * Esta es únicamente la clave que abre la historia.
 */

const CLAVE_SECRETA = "30052026";


/*
 * Fecha desde la que se calcula el contador.
 *
 * 30 de mayo de 2026.
 *
 * Si quieres cambiar el año posteriormente,
 * solamente cambia esta fecha.
 */

const FECHA_INICIO =
    new Date(
        2026,
        4,
        30,
        0,
        0,
        0
    );


/* =========================================================
   ESTADO
   ========================================================= */

let paginaDesbloqueada = false;

let corazonActivado = false;

let explotando = false;

let reconstruyendo = false;

let sorpresaMostrada = false;


/* =========================================================
   MENSAJES CREATIVOS
   ========================================================= */

const mensajesError = [

    "Mmm... esa no es la llave de nuestra historia. 💭",

    "Casi... pero esa fecha no guarda nuestros recuerdos. ♡",

    "Nuestra historia está escondiendo otra fecha... ✦",

    "Ese número no abre este pequeño secreto. 💜",

    "Parece que olvidaste el día que lo cambió todo. ☾",

    "No funciona... pero sé que tú recuerdas cuál es. ♡",

    "Hay una fecha que tiene un lugar especial en nosotros. ✨",

    "Ese no es el recuerdo que estoy buscando... 💭"

];


/* =========================================================
   FUNCIÓN ALEATORIA
   ========================================================= */

function aleatorio(min, max) {

    return Math.random() *
        (max - min) +
        min;
}


/* =========================================================
   MENSAJE DE ERROR
   ========================================================= */

function mostrarError() {

    const indice =
        Math.floor(
            Math.random() *
            mensajesError.length
        );

    mensajeError.textContent =
        mensajesError[indice];


    errorFecha.classList.remove(
        "visible"
    );

    contenedorFecha.classList.remove(
        "error"
    );


    /*
     * Forzamos al navegador a
     * reiniciar la animación.
     */

    void errorFecha.offsetWidth;

    void contenedorFecha.offsetWidth;


    errorFecha.classList.add(
        "visible"
    );

    contenedorFecha.classList.add(
        "error"
    );


    /*
     * Quitamos el error después
     * de unos segundos.
     */

    setTimeout(() => {

        errorFecha.classList.remove(
            "visible"
        );

    }, 5000);
}


/* =========================================================
   DESBLOQUEAR
   ========================================================= */

function desbloquearPagina() {

    if (paginaDesbloqueada) {
        return;
    }


    paginaDesbloqueada = true;


    errorFecha.classList.remove(
        "visible"
    );


    /*
     * Ocultamos completamente
     * la pantalla de bloqueo.
     */

    pantallaEntrada.classList.add(
        "oculta"
    );


    /*
     * Iniciamos el corazón.
     */

    setTimeout(() => {

        iniciarCorazon();

    }, 500);


    /*
     * Llevamos suavemente al
     * comienzo de la experiencia.
     */

    setTimeout(() => {

        inicio.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 800);
}


/* =========================================================
   COMPROBAR CLAVE
   ========================================================= */

function comprobarClave() {

    const valor =
        fechaInput.value
            .replace(/\D/g, "")
            .trim();


    if (
        valor === CLAVE_SECRETA
    ) {

        desbloquearPagina();

    } else {

        mostrarError();

    }
}


/* =========================================================
   BOTÓN DE ENTRADA
   ========================================================= */

btnEntrada.addEventListener(
    "click",
    comprobarClave
);


/* =========================================================
   ENTER EN LA CLAVE
   ========================================================= */

fechaInput.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Enter"
        ) {

            comprobarClave();

        }

    }
);


/* =========================================================
   SOLO NÚMEROS
   ========================================================= */

fechaInput.addEventListener(
    "input",
    () => {

        fechaInput.value =
            fechaInput.value
                .replace(/\D/g, "")
                .slice(0, 8);


        errorFecha.classList.remove(
            "visible"
        );

    }
);


/* =========================================================
   CANVAS
   ========================================================= */

const ctx =
    canvas.getContext("2d");


let canvasWidth = 0;

let canvasHeight = 0;

let centroX = 0;

let centroY = 0;


/* =========================================================
   PARTÍCULAS
   ========================================================= */

let particulas = [];

let particulasExplosivas = [];

let estrellas = [];


/* =========================================================
   TIEMPO
   ========================================================= */

let tiempo = 0;


/* =========================================================
   PREPARAR CANVAS
   ========================================================= */

function prepararCanvas() {

    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    canvasWidth =
        rect.width;

    canvasHeight =
        rect.height;


    canvas.width =
        canvasWidth * dpr;

    canvas.height =
        canvasHeight * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    centroX =
        canvasWidth / 2;

    centroY =
        canvasHeight / 2;
}


/* =========================================================
   CREAR CORAZÓN
   ========================================================= */

function crearCorazon() {

    particulas = [];


    const cantidad =
        window.innerWidth < 600
            ? 700
            : 1100;


    const escala =
        Math.min(
            canvasWidth,
            canvasHeight
        ) * 0.018;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const t =
            Math.random() *
            Math.PI *
            2;


        const profundidad =
            Math.sqrt(
                Math.random()
            );


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            ) *
            escala *
            profundidad;


        const y =
            -(
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t)
            ) *
            escala *
            profundidad;


        particulas.push({

            x:
                centroX + x,

            y:
                centroY + y,

            baseX: x,

            baseY: y,

            objetivoX:
                centroX + x,

            objetivoY:
                centroY + y,

            velocidadX: 0,

            velocidadY: 0,

            radio:
                aleatorio(
                    0.7,
                    2.2
                ),

            brillo:
                aleatorio(
                    0.45,
                    1
                ),

            fase:
                Math.random() *
                Math.PI *
                2
        });
    }
}


/* =========================================================
   ESTRELLAS DE FONDO DEL CANVAS
   ========================================================= */

function crearEstrellas() {

    estrellas = [];


    for (
        let i = 0;
        i < 130;
        i++
    ) {

        estrellas.push({

            x:
                aleatorio(
                    0,
                    canvasWidth
                ),

            y:
                aleatorio(
                    0,
                    canvasHeight
                ),

            radio:
                aleatorio(
                    0.3,
                    1.2
                ),

            brillo:
                aleatorio(
                    0.2,
                    0.8
                ),

            fase:
                Math.random() *
                Math.PI *
                2
        });
    }
}


/* =========================================================
   INICIAR CORAZÓN
   ========================================================= */

function iniciarCorazon() {

    prepararCanvas();

    crearCorazon();

    crearEstrellas();

    animarCorazon();
}


/* =========================================================
   POSICIÓN GIRATORIA
   ========================================================= */

function obtenerPuntoGirado(
    x,
    y,
    angulo
) {

    const cos =
        Math.cos(angulo);

    const sin =
        Math.sin(angulo);


    return {

        x:
            x * cos -
            y * sin,

        y:
            x * sin +
            y * cos

    };
}


/* =========================================================
   ACTUALIZAR CORAZÓN
   ========================================================= */

function actualizarCorazon() {

    /*
     * Pequeña rotación continua.
     */

    const angulo =
        Math.sin(
            tiempo * 0.00045
        ) * 0.12;


    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        const p =
            particulas[i];


        const punto =
            obtenerPuntoGirado(
                p.baseX,
                p.baseY,
                angulo
            );


        p.objetivoX =
            centroX +
            punto.x;

        p.objetivoY =
            centroY +
            punto.y;


        /*
         * Movimiento suave.
         */

        p.x +=
            (
                p.objetivoX -
                p.x
            ) * 0.08;


        p.y +=
            (
                p.objetivoY -
                p.y
            ) * 0.08;
    }
}


/* =========================================================
   DIBUJAR ESTRELLAS
   ========================================================= */

function dibujarEstrellas() {

    for (
        let i = 0;
        i < estrellas.length;
        i++
    ) {

        const estrella =
            estrellas[i];


        const brillo =
            estrella.brillo *
            (
                0.65 +
                Math.sin(
                    tiempo * 0.002 +
                    estrella.fase
                ) * 0.35
            );


        ctx.beginPath();


        ctx.arc(
            estrella.x,
            estrella.y,
            estrella.radio,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                235,
                210,
                255,
                ${brillo}
            )`;


        ctx.fill();
    }
}


/* =========================================================
   DIBUJAR PARTÍCULA
   ========================================================= */

function dibujarParticula(
    p
) {

    const brillo =
        p.brillo *
        (
            0.75 +
            Math.sin(
                tiempo * 0.004 +
                p.fase
            ) * 0.25
        );


    ctx.beginPath();


    ctx.arc(
        p.x,
        p.y,
        p.radio,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        `rgba(
            224,
            194,
            255,
            ${brillo}
        )`;


    ctx.shadowBlur =
        p.radio > 1.5
            ? 9
            : 4;


    ctx.shadowColor =
        "rgba(180,120,255,0.9)";


    ctx.fill();


    ctx.shadowBlur = 0;
}


/* =========================================================
   CLICK DEL CORAZÓN
   ========================================================= */

botonCorazon.addEventListener(
    "click",
    activarExplosion
);


/* =========================================================
   EXPLOSIÓN
   ========================================================= */

function activarExplosion() {

    if (
        corazonActivado
    ) {
        return;
    }


    corazonActivado = true;

    explotando = true;


    indicador.style.opacity =
        "0";


    zonaCorazon.classList.add(
        "explotando"
    );


    /*
     * Convertimos todas las
     * partículas en partículas
     * de explosión.
     */

    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        const p =
            particulas[i];


        let dx =
            p.x -
            centroX;

        let dy =
            p.y -
            centroY;


        let distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distancia < 1
        ) {

            dx =
                aleatorio(
                    -1,
                    1
                );

            dy =
                aleatorio(
                    -1,
                    1
                );

            distancia = 1;
        }


        dx /= distancia;
        dy /= distancia;


        const fuerza =
            aleatorio(
                3,
                10
            );


        p.velocidadX =
            dx * fuerza;

        p.velocidadY =
            dy * fuerza;
    }


    /*
     * Pequeñas explosiones.
     */

    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const angulo =
            aleatorio(
                0,
                Math.PI * 2
            );


        const distancia =
            aleatorio(
                60,
                180
            );


        const x =
            centroX +
            Math.cos(angulo) *
            distancia;


        const y =
            centroY +
            Math.sin(angulo) *
            distancia;


        crearMiniExplosion(
            x,
            y
        );
    }


    /*
     * Comenzar reconstrucción
     * después de la explosión.
     */

    setTimeout(
        comenzarReconstruccion,
        1500
    );
}


/* =========================================================
   MINI EXPLOSIÓN
   ========================================================= */

function crearMiniExplosion(
    x,
    y
) {

    const cantidad =
        Math.floor(
            aleatorio(
                12,
                30
            )
        );


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const angulo =
            aleatorio(
                0,
                Math.PI * 2
            );


        const velocidad =
            aleatorio(
                1,
                4
            );


        particulasExplosivas.push({

            x,
            y,

            velocidadX:
                Math.cos(
                    angulo
                ) *
                velocidad,

            velocidadY:
                Math.sin(
                    angulo
                ) *
                velocidad,

            radio:
                aleatorio(
                    0.6,
                    2.2
                ),

            vida: 1
        });
    }
}


/* =========================================================
   ACTUALIZAR EXPLOSIÓN
   ========================================================= */

function actualizarExplosion() {

    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        const p =
            particulas[i];


        p.x +=
            p.velocidadX;

        p.y +=
            p.velocidadY;


        p.velocidadX *=
            0.965;

        p.velocidadY *=
            0.965;


        p.velocidadY +=
            0.012;
    }


    /*
     * Mini explosiones.
     */

    for (
        let i =
            particulasExplosivas.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            particulasExplosivas[i];


        p.x +=
            p.velocidadX;

        p.y +=
            p.velocidadY;


        p.velocidadX *=
            0.96;

        p.velocidadY *=
            0.96;


        p.vida -=
            0.018;


        if (
            p.vida <= 0
        ) {

            particulasExplosivas.splice(
                i,
                1
            );
        }
    }
}


/* =========================================================
   COMENZAR RECONSTRUCCIÓN
   ========================================================= */

function comenzarReconstruccion() {

    explotando = false;

    reconstruyendo = true;


    zonaCorazon.classList.remove(
        "explotando"
    );


    prepararObjetivosReconstruccion();


    /*
     * Quitamos las mini explosiones
     * poco a poco.
     */

    setTimeout(
        () => {

            particulasExplosivas = [];

        },
        700
    );
}


/* =========================================================
   OBJETIVOS DE RECONSTRUCCIÓN
   ========================================================= */

function prepararObjetivosReconstruccion() {

    const escala =
        Math.min(
            canvasWidth,
            canvasHeight
        ) * 0.018;


    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        const p =
            particulas[i];


        const t =
            Math.random() *
            Math.PI *
            2;


        const profundidad =
            Math.sqrt(
                Math.random()
            );


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            ) *
            escala *
            profundidad;


        const y =
            -(
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t)
            ) *
            escala *
            profundidad;


        p.baseX =
            x;

        p.baseY =
            y;


        /*
         * Las partículas comienzan
         * desde posiciones lejanas.
         */

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const radio =
            aleatorio(
                150,
                430
            );


        p.x =
            centroX +
            Math.cos(
                angulo
            ) *
            radio;


        p.y =
            centroY +
            Math.sin(
                angulo
            ) *
            radio;


        p.objetivoX =
            centroX +
            x;

        p.objetivoY =
            centroY +
            y;
    }
}


/* =========================================================
   RECONSTRUIR
   ========================================================= */

function actualizarReconstruccion() {

    let terminado = true;


    const angulo =
        Math.sin(
            tiempo * 0.00045
        ) * 0.08;


    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        const p =
            particulas[i];


        const punto =
            obtenerPuntoGirado(
                p.baseX,
                p.baseY,
                angulo
            );


        const objetivoX =
            centroX +
            punto.x;


        const objetivoY =
            centroY +
            punto.y;


        p.x +=
            (
                objetivoX -
                p.x
            ) * 0.055;


        p.y +=
            (
                objetivoY -
                p.y
            ) * 0.055;


        const distancia =
            Math.sqrt(

                Math.pow(
                    objetivoX -
                    p.x,
                    2
                )

                +

                Math.pow(
                    objetivoY -
                    p.y,
                    2
                )

            );


        if (
            distancia > 1.5
        ) {

            terminado = false;
        }
    }


    if (
        terminado
    ) {

        terminarReconstruccion();
    }
}


/* =========================================================
   TERMINAR RECONSTRUCCIÓN
   ========================================================= */

function terminarReconstruccion() {

    if (
        !reconstruyendo
    ) {
        return;
    }


    reconstruyendo = false;


    /*
     * Aseguramos que todas
     * las partículas estén en
     * el corazón.
     */

    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        const p =
            particulas[i];


        p.x =
            p.objetivoX;

        p.y =
            p.objetivoY;
    }


    /*
     * Esperamos un momento para
     * que pueda verse el corazón
     * completamente reconstruido.
     */

    setTimeout(
        mostrarSorpresa,
        900
    );
}


/* =========================================================
   SORPRESA
   ========================================================= */

function mostrarSorpresa() {

    if (
        sorpresaMostrada
    ) {
        return;
    }


    sorpresaMostrada = true;


    sorpresa.classList.add(
        "visible"
    );


    crearDestelloFinal();
}


/* =========================================================
   DESTELLO FINAL
   ========================================================= */

function crearDestelloFinal() {

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const angulo =
            Math.random() *
            Math.PI *
            2;


        const radio =
            aleatorio(
                100,
                250
            );


        particulasExplosivas.push({

            x:
                centroX +
                Math.cos(
                    angulo
                ) *
                radio,

            y:
                centroY +
                Math.sin(
                    angulo
                ) *
                radio,

            velocidadX:
                Math.cos(
                    angulo
                ) *
                0.25,

            velocidadY:
                Math.sin(
                    angulo
                ) *
                0.25,

            radio:
                aleatorio(
                    0.5,
                    2
                ),

            vida: 1
        });
    }
}


/* =========================================================
   ANIMACIÓN CANVAS
   ========================================================= */

function animarCorazon(
    timestamp = 0
) {

    tiempo = timestamp;


    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    dibujarEstrellas();


    /*
     * Corazón normal.
     */

    if (
        !explotando &&
        !reconstruyendo
    ) {

        actualizarCorazon();
    }


    /*
     * Explosión.
     */

    if (
        explotando
    ) {

        actualizarExplosion();
    }


    /*
     * Reconstrucción.
     */

    if (
        reconstruyendo
    ) {

        actualizarReconstruccion();
    }


    /*
     * Dibujar corazón.
     */

    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {

        dibujarParticula(
            particulas[i]
        );
    }


    /*
     * Dibujar explosiones.
     */

    for (
        let i = 0;
        i < particulasExplosivas.length;
        i++
    ) {

        const p =
            particulasExplosivas[i];


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.radio,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                255,
                190,
                235,
                ${p.vida}
            )`;


        ctx.shadowBlur = 9;

        ctx.shadowColor =
            "rgba(255,150,220,0.9)";


        ctx.fill();

        ctx.shadowBlur = 0;
    }


    requestAnimationFrame(
        animarCorazon
    );
}


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function irA(elemento) {

    if (!elemento) {
        return;
    }


    elemento.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   BOTÓN DEL PRIMER RECUERDO
   ========================================================= */

btnHistoria.addEventListener(
    "click",
    () => {

        irA(primerViaje);

    }
);


/* =========================================================
   BOTÓN DESPUÉS
   ========================================================= */

btnSiguiente.addEventListener(
    "click",
    () => {

        irA(seccion30Mayo);

    }
);


/* =========================================================
   30 MAYO → RECUERDOS
   ========================================================= */

btnMemorias.addEventListener(
    "click",
    () => {

        irA(seccionRecuerdos);

    }
);


/* =========================================================
   RECUERDOS → ELLA
   ========================================================= */

btnElla.addEventListener(
    "click",
    () => {

        irA(seccionElla);

    }
);


/* =========================================================
   ELLA → CONTADOR
   ========================================================= */

btnFinal.addEventListener(
    "click",
    () => {

        irA(seccionContador);

    }
);


/* =========================================================
   OBSERVADOR DE SECCIONES
   ========================================================= */

const observador =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


observador.observe(
    primerViaje
);


/* =========================================================
   CONTADOR
   ========================================================= */

const diasElemento =
    document.getElementById(
        "dias"
    );

const horasElemento =
    document.getElementById(
        "horas"
    );

const minutosElemento =
    document.getElementById(
        "minutos"
    );

const segundosElemento =
    document.getElementById(
        "segundos"
    );


function actualizarContador() {

    const ahora =
        new Date();


    let diferencia =
        ahora -
        FECHA_INICIO;


    /*
     * Si por alguna razón la
     * fecha todavía no ha llegado,
     * mostramos ceros.
     */

    if (
        diferencia < 0
    ) {

        diferencia = 0;
    }


    const segundo =
        1000;

    const minuto =
        segundo * 60;

    const hora =
        minuto * 60;

    const dia =
        hora * 24;


    const dias =
        Math.floor(
            diferencia / dia
        );


    const horas =
        Math.floor(
            (
                diferencia %
                dia
            ) / hora
        );


    const minutos =
        Math.floor(
            (
                diferencia %
                hora
            ) / minuto
        );


    const segundos =
        Math.floor(
            (
                diferencia %
                minuto
            ) / segundo
        );


    diasElemento.textContent =
        dias;

    horasElemento.textContent =
        horas;

    minutosElemento.textContent =
        minutos;

    segundosElemento.textContent =
        segundos;
}


actualizarContador();


setInterval(
    actualizarContador,
    1000
);


/* =========================================================
   VIDEO
   ========================================================= */

if (videoRecuerdo) {

    videoRecuerdo.addEventListener(
        "play",
        () => {

            console.log(
                "Nuestro primer recuerdo está reproduciéndose 💜"
            );

        }
    );
}


/* =========================================================
   REDIMENSIONAR CANVAS
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            !paginaDesbloqueada
        ) {
            return;
        }


        prepararCanvas();


        /*
         * Recreamos el corazón
         * para que mantenga sus
         * proporciones.
         */

        if (
            !explotando &&
            !reconstruyendo
        ) {

            crearCorazon();
        }


        crearEstrellas();
    }
);


/* =========================================================
   PREVENIR DOBLE CLICK ACCIDENTAL
   ========================================================= */

botonCorazon.addEventListener(
    "dblclick",
    (evento) => {

        evento.preventDefault();

    }
);


/* =========================================================
   MENSAJE DE CONSOLA
   ========================================================= */

console.log(
    "%cPara mi patita 💜",
    "font-size:20px;color:#c394ff;"
);

console.log(
    "Nuestra pequeña historia está lista para comenzar."
);