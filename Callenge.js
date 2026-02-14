//Challegenge 01 es par o impar

//RFuncion regular

function ParImpar(numero) {
  if (numero % 2 === 0) {
    console.log(numero + " es par");
  } else {
    console.log(numero + " es impar");
  }
}

// Ejemplo de uso
ParImpar(4);
ParImpar(7);

//Funcion de flecha

const ParImparArrow = (numero) => {
  if (numero % 2 === 0) {
    console.log(numero + " es par");
  } else {
    console.log(numero + " es impar");
  }
};

// Example
ParImparArrow(10);
ParImparArrow(3);


