document.getElementById("texto").addEventListener("input", function() {
  let inputValue = this.value;
  let newValue = inputValue.replace(/[^a-z\s]/g, '');
  if (inputValue !== newValue) {
    this.value = newValue;
    this.classList.add('error');
    swal({
      title: "Ooops!",
      text: "Solo palabras en minúscula sin números ni símbolos",
      icon: "warning", 
      button: "OK",
    });
  } else {
    this.classList.remove('error');
  }
});

function encriptar() {
  let texto = document.getElementById("texto").value;
  let tituloMensaje = document.getElementById("titulo-mensaje");
  let parrafo = document.getElementById("parrafo");
  let muñeco = document.getElementById("muñeco");
  let resultado = document.getElementById("resultado");

  let textoCifrado = texto
    .replace(/e/gi, "enter")
    .replace(/i/gi, "imes")
    .replace(/a/gi, "ai")
    .replace(/o/gi, "ober")
    .replace(/u/gi, "ufat");

  if (texto.length != 0) {
    resultado.value = textoCifrado;
    tituloMensaje.textContent = "Texto encriptado con éxito";
    parrafo.textContent = "";
    muñeco.src = "./img/encriptado.jpg";
  } else {
    muñeco.src = "./img/muñeco.png";
    tituloMensaje.textContent = "Ningún mensaje fue encontrado";
    parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
    swal({
      title: "Ooops!",
      text: "Debes ingresar un texto",
      icon: "error", 
      button: "OK",
    });
  }
}


function desencriptar() {
  let texto = document.getElementById("texto").value;
  let tituloMensaje = document.getElementById("titulo-mensaje");
  let parrafo = document.getElementById("parrafo");
  let muñeco = document.getElementById("muñeco");
  let resultado = document.getElementById("resultado");

  let textoCifrado = texto
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");
  
    if (texto.length != 0) {
      resultado.value = textoCifrado;
      tituloMensaje.textContent = "Texto desencriptado con éxito";
      parrafo.textContent = "";
      muñeco.src = "./img/desencriptado.jpg";
    } else {
      muñeco.src = "./img/muñeco.png";
      tituloMensaje.textContent = "Ningún mensaje fue encontrado";
      parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
      swal({
        title: "Ooops!",
        text: "Debes ingresar un texto",
        icon: "error", 
        button: "OK",
      });
    }
}
function copiarTexto() {
  const resultado = document.getElementById("resultado");
  const texto = document.getElementById("texto").value.trim(); // Obtener el contenido del textarea y quitar espacios en blanco al inicio y al final

  if (texto.length === 0) {
    swal({
      title: "Oops!",
      text: "No hay texto para copiar",
      icon: "warning",
      button: "OK",
    });
    return;
  }

  resultado.select();
  document.execCommand("copy");
  swal("¡Copiado!", "El texto ha sido copiado al portapapeles", "success");
}
