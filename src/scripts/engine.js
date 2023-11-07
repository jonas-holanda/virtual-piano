const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);

}

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {    
    if (mapedKeys.includes(e.key)) {
        playTune(e.key);
    }
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
} 

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

const checkWidth = () => {
   const container = document.querySelector(".container");
   if ( window.matchMedia("(orientation: portrait)").matches ) {
        container.style.display = "none";

        Swal.fire({
            title: "Aviso!",
            text: "Gire a tela do seu dispositivo para uma melhor experiência. Caso já tenha girado clique em OK.",
            imageUrl: "./src/images/orientation.webp",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Imagem com a orientação do dispositivo",
        });

   } else {
    container.style.display = "block";
   }
   
}

const idWidth = setInterval(checkWidth, 3000);
