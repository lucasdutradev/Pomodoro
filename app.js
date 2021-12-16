const startButton = document.querySelector(".start");
const cancelButton = document.querySelector(".cancel");
const modalBox = document.querySelector("section.modal");
const buttonMax = document.querySelectorAll(".buttons");

function getButtonCount() {
    let maxTrabalho = [];
    let maxPausa = [];
    let maxSessoes = [];
    for (let i = 0; i < buttonMax.length; i++) {
        buttonMax[i].children[0].addEventListener("click", () => {
            if (buttonMax[i] === buttonMax[0]) {
                maxTrabalho.push(buttonMax[i].children[0])
            }
            if (buttonMax[i] === buttonMax[1]) {
                maxPausa.push(buttonMax[i].children[0])
            }
            if (buttonMax[i] === buttonMax[2]) {
                maxSessoes.push(buttonMax[i].children[0])
            }
            callNumber(maxTrabalho, maxPausa, maxSessoes)
        });
        buttonMax[i].children[1].addEventListener("click", () => {
            if (buttonMax[i] === buttonMax[0]) {
                maxTrabalho.pop()
            }
            if (buttonMax[i] === buttonMax[1]) {
                maxPausa.pop()
            }
            if (buttonMax[i] === buttonMax[2]) {
                maxSessoes.pop()
            }
            callNumber(maxTrabalho, maxPausa, maxSessoes)
        });
    }
}

function callNumber(maxTrabalho, maxPausa, maxSessoes) {
    const timer = document.querySelectorAll(".timer")
    timer.forEach((valor) => {
        if (valor.id === "Trabalho") {
            valor.innerHTML = maxTrabalho.length
            Number(valor.innerHTML) > 0 ? valor.classList.add("preenchendo") : valor.classList.remove("preenchendo");
        }
        if (valor.id === "Pausa") {
            valor.innerHTML = maxPausa.length
            Number(valor.innerHTML) > 0 ? valor.classList.add("preenchendo") : valor.classList.remove("preenchendo")
        }
        if (valor.id === "Sessoes") {
            valor.innerHTML = maxSessoes.length
            Number(valor.innerHTML) > 0 ? valor.classList.add("preenchendo") : valor.classList.remove("preenchendo")
        }
    })
}

function startCount() {
    modalBox.classList.remove("hidden");

    const minutesGap = document.querySelector("#Trabalho").innerHTML
    const pausa = document.querySelector("#Pausa").innerHTML
    const sessao = document.querySelector("#Sessoes").innerHTML
    const display = document.querySelector('#timer');

    let quantSessao = Number(sessao)
    if(quantSessao % 2 !== 0){quantSessao++}
    let duration = 60 * Number(minutesGap);
    let isTrabalho = false

    let timer = duration, minutes, seconds;
    let regressive = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.innerHTML = minutes + ":" + seconds;
        if (--timer < 0) {
            if (isTrabalho === false && quantSessao > 0) {
                console.log(`is trabalho: ${isTrabalho}`)
                isTrabalho = true
                display.style.borderColor = "yellow"
                duration = 60 * Number(pausa);
                timer = duration;
                quantSessao--;
            }else if (isTrabalho && quantSessao > 0) {
                console.log(`is trabalho: ${isTrabalho}`)
                isTrabalho = false
                display.style.borderColor = "green"
                duration = 60 * Number(minutesGap);
                timer = duration;
                quantSessao--;
            }else if(quantSessao === 0) {
                display.style.borderColor = "red"
                duration = 0 * 0;
                timer = duration;
            }
        }
    }, 50);


    cancelButton.addEventListener("click", () => {
        display.style.borderColor = "green"
        modalBox.classList.add("hidden");
        clearInterval(regressive);
    });
}

startButton.addEventListener("click", startCount);

getButtonCount()