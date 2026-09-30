/* =========================================================
   PARA MI PATITA
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const CLAVE_SECRETA = "30052026";

    /*
       Fecha desde la que comienza el contador.
       30 de mayo de 2026.
    */
    const FECHA_INICIO = new Date(
        2026,
        4,
        30,
        0,
        0,
        0
    );


    /* =====================================================
       ELEMENTOS PRINCIPALES
    ====================================================== */

    const pantallaEntrada =
        document.getElementById("pantallaEntrada");

    const fechaInput =
        document.getElementById("fechaInput");

    const btnEntrada =
        document.getElementById("btnEntrada");

    const mensajeError =
        document.getElementById("mensajeError");

    const candado =
        document.getElementById("candado");


    /* =====================================================
       MENSAJES PARA LLAVE INCORRECTA
    ====================================================== */

    const mensajesError = [

        "Mmm... esa no es la llave de nuestra historia. 💭",

        "Casi... pero mi corazón sabe que no es esa. ♡",

        "Esa llave no abre nuestro universo. ✨",

        "Inténtalo otra vez, mi patita. Hay algo bonito esperándote. 💜",

        "Nuestro corazón recuerda la llave correcta. ♡",

        "No todavía... nuestra historia tiene una llave especial. 🌙"

    ];

    let intentoError = 0;


    /* =====================================================
       ABRIR HISTORIA
    ====================================================== */

    function abrirHistoria() {

        pantallaEntrada.classList.add("oculta");

        document.body.classList.remove("bloqueado");

        iniciarCorazon();

        mostrarEscena("inicio");

        setTimeout(() => {

            pantallaEntrada.style.display = "none";

        }, 1100);
    }


    /* =====================================================
       VALIDAR LLAVE
    ====================================================== */

    function comprobarClave() {

        const valor =
            fechaInput.value.trim();

        if (valor === CLAVE_SECRETA) {

            fechaInput.classList.remove("error");

            mensajeError.textContent = "";

            candado.textContent = "♡";

            abrirHistoria();

            return;
        }


        /* Error */

        fechaInput.classList.remove("error");

        /*
           Forzamos reflow para que la animación
           vuelva a ejecutarse.
        */
        void fechaInput.offsetWidth;

        fechaInput.classList.add("error");

        mensajeError.textContent =
            mensajesError[
                intentoError % mensajesError.length
            ];

        intentoError++;

        candado.textContent = "♡";

        setTimeout(() => {

            fechaInput.select();

        }, 100);
    }


    btnEntrada.addEventListener(
        "click",
        comprobarClave
    );


    fechaInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                comprobarClave();
            }
        }
    );


    /* =====================================================
       ESCENAS
    ====================================================== */

    const escenas =
        document.querySelectorAll(".escena");


    function mostrarEscena(id) {

        escenas.forEach((escena) => {

            escena.classList.remove("activa");

        });


        const destino =
            document.getElementById(id);

        if (!destino) {
            return;
        }

        destino.classList.add("activa");


        /*
           Al cambiar de escena cerramos
           visores abiertos.
        */
        cerrarTodosLosVisores();


        /*
           Detener video cuando no estamos
           viendo el recuerdo.
        */
        if (
            videoRecuerdo &&
            id !== "primerViaje"
        ) {

            videoRecuerdo.pause();

        }


        /*
           La canción solamente sigue cuando
           estamos dentro de la escena musical.
        */
        if (
            audioCancion &&
            id !== "seccionCancion"
        ) {

            audioCancion.pause();

            actualizarBotonPlay();
        }
    }


    /* =====================================================
       BOTÓN INICIAL
    ====================================================== */

    const btnHistoria =
        document.getElementById("btnHistoria");

    btnHistoria.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       ÁRBOL CRONOLÓGICO
    ====================================================== */

    const btnAbril =
        document.getElementById("btnAbril");

    const btnVideoRecuerdo =
        document.getElementById("btnVideoRecuerdo");

    const btnMayo =
        document.getElementById("btnMayo");

    const btnNosotros =
        document.getElementById("btnNosotros");

    const btnElla =
        document.getElementById("btnElla");

    const btnTiempo =
        document.getElementById("btnTiempo");

    const btnCancion =
        document.getElementById("btnCancion");

    const btnSuenos =
        document.getElementById("btnSuenos");


    /*
       01 — 30 DE ABRIL
    */

    btnAbril.addEventListener(
        "click",
        () => {

            mostrarEscena("primerViaje");

        }
    );


    /*
       02 — VIDEO
    */

    btnVideoRecuerdo.addEventListener(
        "click",
        () => {

            abrirVideo();

        }
    );


    /*
       03 — 30 DE MAYO
    */

    btnMayo.addEventListener(
        "click",
        () => {

            mostrarEscena("seccion30Mayo");

        }
    );


    /*
       04 — NOSOTROS
    */

    btnNosotros.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionRecuerdos");

        }
    );


    /*
       05 — ELLA
    */

    btnElla.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionElla");

        }
    );


    /*
       06 — TIEMPO
    */

    btnTiempo.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionContador");

        }
    );


    /*
       07 — CANCIÓN
    */

    btnCancion.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionCancion");

        }
    );


    /*
       08 — SUEÑOS
    */

    btnSuenos.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionSuenos");

        }
    );


    /* =====================================================
       NAVEGACIÓN DESDE 30 DE ABRIL
    ====================================================== */

    const btnVideoAbril =
        document.getElementById("btnVideoAbril");

    const btnSiguiente =
        document.getElementById("btnSiguiente");

    const btnVolverArbolAbril =
        document.getElementById("btnVolverArbolAbril");


    btnVideoAbril.addEventListener(
        "click",
        () => {

            abrirVideo();

        }
    );


    /*
       Después del primer recuerdo
       vamos directamente al noviazgo.
    */

    btnSiguiente.addEventListener(
        "click",
        () => {

            mostrarEscena("seccion30Mayo");

        }
    );


    btnVolverArbolAbril.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       NAVEGACIÓN 30 DE MAYO
    ====================================================== */

    const btnMemorias =
        document.getElementById("btnMemorias");

    const btnVolverArbolMayo =
        document.getElementById("btnVolverArbolMayo");


    btnMemorias.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionRecuerdos");

        }
    );


    btnVolverArbolMayo.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       NAVEGACIÓN NOSOTROS
    ====================================================== */

    const btnEllaDesdeNosotros =
        document.getElementById("btnEllaDesdeNosotros");

    const btnVolverArbolNosotros =
        document.getElementById("btnVolverArbolNosotros");


    btnEllaDesdeNosotros.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionElla");

        }
    );


    btnVolverArbolNosotros.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       NAVEGACIÓN ELLA
    ====================================================== */

    const btnFinal =
        document.getElementById("btnFinal");

    const btnVolverArbolElla =
        document.getElementById("btnVolverArbolElla");


    btnFinal.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionContador");

        }
    );


    btnVolverArbolElla.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       NAVEGACIÓN CONTADOR
    ====================================================== */

    const btnCancionDesdeContador =
        document.getElementById(
            "btnCancionDesdeContador"
        );

    const btnVolverArbolTiempo =
        document.getElementById(
            "btnVolverArbolTiempo"
        );


    btnCancionDesdeContador.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionCancion");

        }
    );


    btnVolverArbolTiempo.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       NAVEGACIÓN CANCIÓN
    ====================================================== */

    const btnSuenosDesdeCancion =
        document.getElementById(
            "btnSuenosDesdeCancion"
        );

    const btnVolverArbolCancion =
        document.getElementById(
            "btnVolverArbolCancion"
        );


    btnSuenosDesdeCancion.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionSuenos");

        }
    );


    btnVolverArbolCancion.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       NAVEGACIÓN SUEÑOS
    ====================================================== */

    const btnFinalDesdeSuenos =
        document.getElementById(
            "btnFinalDesdeSuenos"
        );

    const btnVolverArbolSuenos =
        document.getElementById(
            "btnVolverArbolSuenos"
        );


    btnFinalDesdeSuenos.addEventListener(
        "click",
        () => {

            mostrarEscena("seccionFinal");

        }
    );


    btnVolverArbolSuenos.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       VOLVER DESDE FINAL
    ====================================================== */

    const btnVolverHistoria =
        document.getElementById(
            "btnVolverHistoria"
        );


    btnVolverHistoria.addEventListener(
        "click",
        () => {

            mostrarEscena("escenaArbol");

        }
    );


    /* =====================================================
       VISOR DE FOTOS
    ====================================================== */

    const visorFoto =
        document.getElementById("visorFoto");

    const visorFotoMayo =
        document.getElementById("visorFotoMayo");

    const visorFotoNosotros =
        document.getElementById(
            "visorFotoNosotros"
        );

    const visorFotoElla =
        document.getElementById("visorFotoElla");


    const btnFotoAbril =
        document.getElementById("btnFotoAbril");

    const btnFotoMayo =
        document.getElementById("btnFotoMayo");

    const btnFotoNosotros =
        document.getElementById(
            "btnFotoNosotros"
        );

    const btnFotoElla =
        document.getElementById("btnFotoElla");


    function abrirVisor(visor) {

        if (!visor) {
            return;
        }

        cerrarTodosLosVisores();

        visor.classList.add("abierto");

        visor.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function cerrarVisor(visor) {

        if (!visor) {
            return;
        }

        visor.classList.remove("abierto");

        visor.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    function cerrarTodosLosVisores() {

        document
            .querySelectorAll(".visor-media")
            .forEach((visor) => {

                visor.classList.remove("abierto");

                visor.setAttribute(
                    "aria-hidden",
                    "true"
                );

            });

        if (videoRecuerdo) {

            videoRecuerdo.pause();

        }
    }


    btnFotoAbril.addEventListener(
        "click",
        () => {

            abrirVisor(visorFoto);

        }
    );


    btnFotoMayo.addEventListener(
        "click",
        () => {

            abrirVisor(visorFotoMayo);

        }
    );


    btnFotoNosotros.addEventListener(
        "click",
        () => {

            abrirVisor(visorFotoNosotros);

        }
    );


    btnFotoElla.addEventListener(
        "click",
        () => {

            abrirVisor(visorFotoElla);

        }
    );


    /* =====================================================
       CERRAR VISORES
    ====================================================== */

    document
        .querySelectorAll("[data-cerrar]")
        .forEach((boton) => {

            boton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    cerrarTodosLosVisores();

                }
            );

        });


    /*
       Cerrar al tocar el fondo.
    */

    document
        .querySelectorAll(".visor-media")
        .forEach((visor) => {

            visor.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target === visor
                    ) {

                        cerrarTodosLosVisores();

                    }

                }
            );

        });


    /* =====================================================
       VIDEO
    ====================================================== */

    const visorVideo =
        document.getElementById("visorVideo");

    const videoRecuerdo =
        document.getElementById("videoRecuerdo");


    function abrirVideo() {

        if (!visorVideo) {
            return;
        }

        cerrarTodosLosVisores();

        visorVideo.classList.add("abierto");

        visorVideo.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           Intentamos reproducir automáticamente.
        */

        setTimeout(() => {

            if (videoRecuerdo) {

                videoRecuerdo.currentTime = 0;

                const promesa =
                    videoRecuerdo.play();

                if (
                    promesa &&
                    typeof promesa.catch === "function"
                ) {

                    promesa.catch(() => {
                        /*
                           Algunos navegadores
                           bloquean autoplay.
                        */
                    });

                }

            }

        }, 350);
    }


    /* =====================================================
       ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                cerrarTodosLosVisores();

            }

        }
    );


    /* =====================================================
       CONTADOR
    ====================================================== */

    const dias =
        document.getElementById("dias");

    const horas =
        document.getElementById("horas");

    const minutos =
        document.getElementById("minutos");

    const segundos =
        document.getElementById("segundos");


    function actualizarContador() {

        const ahora =
            new Date();

        let diferencia =
            ahora.getTime() -
            FECHA_INICIO.getTime();


        if (diferencia < 0) {

            diferencia = 0;

        }


        const totalSegundos =
            Math.floor(
                diferencia / 1000
            );


        const diasTotales =
            Math.floor(
                totalSegundos / 86400
            );


        const horasTotales =
            Math.floor(
                (totalSegundos % 86400) / 3600
            );


        const minutosTotales =
            Math.floor(
                (totalSegundos % 3600) / 60
            );


        const segundosTotales =
            totalSegundos % 60;


        dias.textContent =
            diasTotales.toLocaleString("es-CO");


        horas.textContent =
            String(horasTotales).padStart(2, "0");


        minutos.textContent =
            String(minutosTotales).padStart(2, "0");


        segundos.textContent =
            String(segundosTotales).padStart(2, "0");
    }


    actualizarContador();

    setInterval(
        actualizarContador,
        1000
    );


    /* =====================================================
       CORAZÓN DE PARTÍCULAS
    ====================================================== */

    const canvas =
        document.getElementById(
            "canvasCorazon"
        );

    const ctx =
        canvas
            ? canvas.getContext("2d")
            : null;

    const btnCorazon =
        document.getElementById(
            "btnCorazon"
        );

    const mensajeCorazon =
        document.getElementById(
            "mensajeCorazon"
        );


    let particulas = [];

    let animacionCorazon = null;

    let corazonIniciado = false;

    let explosionActiva = false;

    let mensajeMostrado = false;


    /*
       Número de partículas.
    */

    const TOTAL_PARTICULAS = 850;


    function crearParticula(i) {

        const t =
            Math.random() *
            Math.PI *
            2;


        /*
           Fórmula matemática de corazón.
        */

        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            -(
                13 *
                Math.cos(t) -
                5 *
                Math.cos(2 * t) -
                2 *
                Math.cos(3 * t) -
                Math.cos(4 * t)
            );


        const escala =
            10.5;


        const destinoX =
            canvas.width / 2 +
            x * escala;


        const destinoY =
            canvas.height / 2 +
            y * escala;


        return {

            x:
                canvas.width / 2 +
                (Math.random() - .5) * 50,

            y:
                canvas.height / 2 +
                (Math.random() - .5) * 50,

            destinoX,
            destinoY,

            vx:
                (Math.random() - .5) * 1.2,

            vy:
                (Math.random() - .5) * 1.2,

            radio:
                Math.random() * 1.8 + .6,

            alpha:
                Math.random() * .65 + .35,

            velocidad:
                Math.random() * .035 + .015,

            fase:
                Math.random() * Math.PI * 2,

            explosionX: 0,
            explosionY: 0

        };
    }


    function iniciarParticulas() {

        if (!canvas || !ctx) {
            return;
        }

        particulas = [];

        for (
            let i = 0;
            i < TOTAL_PARTICULAS;
            i++
        ) {

            particulas.push(
                crearParticula(i)
            );

        }
    }


    function dibujarParticula(particula) {

        ctx.beginPath();

        ctx.arc(
            particula.x,
            particula.y,
            particula.radio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(239, 205, 255, ${particula.alpha})`;

        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "rgba(214, 153, 255, .8)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }


    function animarCorazon() {

        if (!ctx || !canvas) {
            return;
        }


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particulas.forEach(
            (particula) => {

                if (!explosionActiva) {

                    particula.x +=
                        (particula.destinoX - particula.x) *
                        particula.velocidad;

                    particula.y +=
                        (particula.destinoY - particula.y) *
                        particula.velocidad;


                    /*
                       Movimiento orgánico.
                    */

                    particula.x +=
                        Math.sin(
                            Date.now() * .001 +
                            particula.fase
                        ) * .12;

                    particula.y +=
                        Math.cos(
                            Date.now() * .0012 +
                            particula.fase
                        ) * .12;

                } else {

                    particula.x +=
                        particula.vx;

                    particula.y +=
                        particula.vy;

                    particula.vx *= .985;
                    particula.vy *= .985;

                }


                dibujarParticula(
                    particula
                );

            }
        );


        animacionCorazon =
            requestAnimationFrame(
                animarCorazon
            );
    }


    function iniciarCorazon() {

        if (corazonIniciado) {
            return;
        }

        corazonIniciado = true;

        iniciarParticulas();

        animarCorazon();
    }


    /*
       Explosión.
    */

    function explotarCorazon() {

        if (
            !canvas ||
            explosionActiva
        ) {

            return;

        }

        explosionActiva = true;


        const centroX =
            canvas.width / 2;

        const centroY =
            canvas.height / 2;


        particulas.forEach(
            (particula) => {

                const dx =
                    particula.x -
                    centroX;

                const dy =
                    particula.y -
                    centroY;


                const distancia =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    ) || 1;


                const fuerza =
                    Math.random() * 7 + 4;


                particula.vx =
                    (dx / distancia) *
                    fuerza;

                particula.vy =
                    (dy / distancia) *
                    fuerza;

            }
        );


        /*
           Después de explotar,
           reconstruimos el corazón.
        */

        setTimeout(
            () => {

                explosionActiva = false;

                particulas.forEach(
                    (particula) => {

                        particula.x +=
                            (Math.random() - .5) * 200;

                        particula.y +=
                            (Math.random() - .5) * 200;

                    }
                );

            },
            750
        );


        /*
           Mensaje romántico.
        */

        if (!mensajeMostrado) {

            mensajeMostrado = true;

            setTimeout(
                () => {

                    mensajeCorazon.textContent =
                        "Te amo millones de universos. ♡";

                    mensajeCorazon.style.color =
                        "rgba(255, 197, 229, .9)";

                },
                1100
            );
        }
    }


    if (btnCorazon) {

        btnCorazon.addEventListener(
            "click",
            explotarCorazon
        );

    }


    /* =====================================================
       REPRODUCTOR DE CANCIÓN
    ====================================================== */

    const audioCancion =
        document.getElementById(
            "audioCancion"
        );

    const btnPlayCancion =
        document.getElementById(
            "btnPlayCancion"
        );

    const barraProgreso =
        document.getElementById(
            "barraProgreso"
        );

    const tiempoActual =
        document.getElementById(
            "tiempoActual"
        );

    const tiempoTotal =
        document.getElementById(
            "tiempoTotal"
        );

    const btnVolumen =
        document.getElementById(
            "btnVolumen"
        );

    const barraVolumen =
        document.getElementById(
            "barraVolumen"
        );

    const vinilo =
        document.getElementById(
            "vinilo"
        );


    function formatearTiempo(segundos) {

        if (
            !Number.isFinite(segundos)
        ) {

            return "0:00";

        }


        const minutos =
            Math.floor(
                segundos / 60
            );

        const segundosRestantes =
            Math.floor(
                segundos % 60
            );


        return (
            minutos +
            ":" +
            String(
                segundosRestantes
            ).padStart(2, "0")
        );
    }


    function actualizarBotonPlay() {

        if (
            !audioCancion ||
            !btnPlayCancion
        ) {

            return;

        }


        if (
            audioCancion.paused
        ) {

            btnPlayCancion.textContent =
                "▶";

            vinilo?.classList.remove(
                "reproduciendo"
            );

        } else {

            btnPlayCancion.textContent =
                "Ⅱ";

            vinilo?.classList.add(
                "reproduciendo"
            );

        }
    }


    if (audioCancion) {

        audioCancion.volume =
            Number(
                barraVolumen?.value || .8
            );


        audioCancion.addEventListener(
            "loadedmetadata",
            () => {

                tiempoTotal.textContent =
                    formatearTiempo(
                        audioCancion.duration
                    );

            }
        );


        audioCancion.addEventListener(
            "timeupdate",
            () => {

                if (
                    Number.isFinite(
                        audioCancion.duration
                    )
                ) {

                    const porcentaje =
                        (
                            audioCancion.currentTime /
                            audioCancion.duration
                        ) * 100;


                    barraProgreso.value =
                        porcentaje || 0;

                }


                tiempoActual.textContent =
                    formatearTiempo(
                        audioCancion.currentTime
                    );

            }
        );


        audioCancion.addEventListener(
            "play",
            actualizarBotonPlay
        );


        audioCancion.addEventListener(
            "pause",
            actualizarBotonPlay
        );


        audioCancion.addEventListener(
            "ended",
            () => {

                actualizarBotonPlay();

                barraProgreso.value = 0;

            }
        );

    }


    if (btnPlayCancion) {

        btnPlayCancion.addEventListener(
            "click",
            async () => {

                if (!audioCancion) {
                    return;
                }


                try {

                    if (
                        audioCancion.paused
                    ) {

                        await audioCancion.play();

                    } else {

                        audioCancion.pause();

                    }

                } catch (error) {

                    console.log(
                        "No se pudo reproducir la canción:",
                        error
                    );

                }

                actualizarBotonPlay();

            }
        );

    }


    if (barraProgreso) {

        barraProgreso.addEventListener(
            "input",
            () => {

                if (
                    !audioCancion ||
                    !Number.isFinite(
                        audioCancion.duration
                    )
                ) {

                    return;

                }


                audioCancion.currentTime =
                    (
                        Number(
                            barraProgreso.value
                        ) / 100
                    ) *
                    audioCancion.duration;

            }
        );

    }


    if (barraVolumen) {

        barraVolumen.addEventListener(
            "input",
            () => {

                if (!audioCancion) {
                    return;
                }


                audioCancion.volume =
                    Number(
                        barraVolumen.value
                    );


                actualizarIconoVolumen();

            }
        );

    }


    function actualizarIconoVolumen() {

        if (
            !audioCancion ||
            !btnVolumen
        ) {

            return;

        }


        if (
            audioCancion.volume === 0
        ) {

            btnVolumen.textContent =
                "🔇";

        } else if (
            audioCancion.volume < .5
        ) {

            btnVolumen.textContent =
                "🔉";

        } else {

            btnVolumen.textContent =
                "🔊";

        }
    }


    if (btnVolumen) {

        btnVolumen.addEventListener(
            "click",
            () => {

                if (!audioCancion) {
                    return;
                }


                if (
                    audioCancion.volume > 0
                ) {

                    audioCancion.dataset.volumenAnterior =
                        audioCancion.volume;

                    audioCancion.volume = 0;

                    barraVolumen.value = 0;

                } else {

                    const volumen =
                        Number(
                            audioCancion.dataset.volumenAnterior ||
                            .8
                        );

                    audioCancion.volume =
                        volumen;

                    barraVolumen.value =
                        volumen;

                }


                actualizarIconoVolumen();

            }
        );

    }


    /* =====================================================
       BLOQUEAR SCROLL
    ====================================================== */

    function bloquearScroll(event) {

        /*
           No permitimos rueda,
           touch scroll ni desplazamiento
           de página.
        */

        event.preventDefault();

    }


    window.addEventListener(
        "wheel",
        bloquearScroll,
        {
            passive: false
        }
    );


    window.addEventListener(
        "touchmove",
        bloquearScroll,
        {
            passive: false
        }
    );


    window.addEventListener(
        "scroll",
        () => {

            window.scrollTo(
                0,
                0
            );

        }
    );


    /*
       También bloqueamos teclas que normalmente
       desplazan la página.
    */

    document.addEventListener(
        "keydown",
        (event) => {

            const teclasBloqueadas = [

                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                " ",
                "PageUp",
                "PageDown",
                "Home",
                "End"

            ];


            if (
                teclasBloqueadas.includes(
                    event.key
                )
            ) {

                /*
                   No bloqueamos Enter dentro
                   de campos de entrada.
                */

                if (
                    event.target.tagName ===
                    "INPUT"
                ) {

                    return;

                }


                event.preventDefault();

            }

        }
    );


    /* =====================================================
       EVITAR ZOOM POR DOBLE TOQUE EN MÓVIL
    ====================================================== */

    let ultimoToque = 0;

    document.addEventListener(
        "touchend",
        (event) => {

            const ahora =
                Date.now();

            if (
                ahora - ultimoToque <= 300
            ) {

                event.preventDefault();

            }

            ultimoToque = ahora;

        },
        {
            passive: false
        }
    );


    /* =====================================================
       EVITAR ARRASTRAR IMÁGENES
    ====================================================== */

    document
        .querySelectorAll("img")
        .forEach((imagen) => {

            imagen.addEventListener(
                "dragstart",
                (event) => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       INICIO
    ====================================================== */

    /*
       Al cargar la página mostramos
       solamente la pantalla de entrada.
    */

    document.body.classList.add(
        "bloqueado"
    );


    /*
       No mostramos la experiencia
       hasta introducir la llave.
    */

    escenas.forEach(
        (escena) => {

            escena.classList.remove(
                "activa"
            );

        }
    );


    /* =====================================================
       ESTADO INICIAL
    ====================================================== */

    mensajeCorazon.textContent =
        "Nuestro corazón guarda algo para ti...";


    actualizarIconoVolumen();

});