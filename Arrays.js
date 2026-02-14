const arr1 =[1,2,3,4,];
const arr2 = [5,6,7,8,9];

const arr3 = 10;

//Arrays de metodos.
//Array.isArray() - devuelve true si el objeto es un array, de lo contrario devuelve false.
console.log(Array.isArray(arr1));
console.log(Array.isArray(arr3));

//Array.from() - crea una nueva instancia de Array a partir de un objeto iterable o similar a un array.
const string = 'Hola';
const str = Array.from(string);

console.log(str);

//Combinar arreglos con .from
const set = new Set([...arr1, ...arr2]);
const combinado = Array.from(set);
console.log(combinado);

//Array.fromAsync() - crea una nueva instancia de Array a partir de un objeto iterable o similar a un array, 
// pero devuelve una promesa que se resuelve con el nuevo array.
const asyncArray = Array.fromAsync(Promise.resolve([1, 2, 3]));
asyncArray.then(result => console.log(result));

// Array.of() - crea una nueva instancia de Array con un número variable 
// de argumentos, independientemente del número o tipo de los argumentos.
const arrayOf = Array.of(1, 'dos', true, null);
console.log(arrayOf);
console.log(new Array(5)); // Crea un array vacio de 5 elementos.

//Array de busqueda y transformación.

//Includes() - determina si un array incluye un determinado elemento, 
// devuelve true o false según corresponda.
console.log(arr1.includes(2));
console.log(arr1.includes(5));

//indexOf() - devuelve el primer índice en el que se puede encontrar un elemento 
// dado en el array, o -1 si no está presente.
console.log(arr1.indexOf(3));
console.log(arr2.indexOf(5));
console.log(arr1.indexOf(7));

//lastIndexOf() - devuelve el último índice en el que se puede encontrar un 
// elemento dado en el array, o -1 si no está presente.
const arr4 = [10, 11, 12, 11, 13];
console.log(arr4.lastIndexOf(11));
console.log(arr4.lastIndexOf(5));

//find() - devuelve el valor del primer elemento del array que cumple la 
// función de prueba proporcionada.
const Par1 = arr1.find(n => n % 2 === 0);
console.log(Par1);

//findIndex() - devuelve el índice del primer elemento del array que cumple la 
// función de prueba proporcionada, o -1 si no se encuentra ningún elemento que cumpla la condición.
const Par2 = arr2.findIndex(n => n % 2 === 0);
console.log(Par2);

//findLast() - devuelve el valor del último elemento del array que cumple la 
// función de prueba proporcionada.
const Par3 = arr1.findLast(n => n % 2 === 0);
console.log(Par3);

//findLastIndex() - devuelve el índice del último elemento del array que cumple la 
// función de prueba proporcionada, o -1 si no se encuentra ningún elemento que cumpla la condición.
const Par4 = arr2.findLastIndex(n => n % 2 === 0);
console.log(Par4);

//Metodos de recorrido y transformación.

//forEach() - ejecuta una función proporcionada una vez por cada elemento 
// del array.
arr1.forEach((n, i) => {
    console.log(`arr1[${i}] = ${n}`);
});

//map() - crea un nuevo array con los resultados de la llamada a una función 
// proporcionada.
const cuadrados = arr2.map(n => n * n);
console.log(cuadrados);

//filter() - crea un nuevo array con todos los elementos que cumplan la 
// condición implementada por la función dada.
const mayor6 = arr2.filter(n => n > 6);
console.log(mayor6);

//reduce() - ejecuta una función reductora sobre cada elemento del array,
// resultando en un único valor.
const suma = arr1.reduce((acc, n) => acc + n, 0);
console.log(suma);

//reduceRight() - ejecuta una función reductora sobre cada elemento del array, 
// de derecha a izquierda, resultando en un único valor.
const resta = arr1.reduceRight((acc, n) => acc - n);
console.log(resta);

//flat() - devuelve un nuevo array con todos los elementos de sub-array concatenados
// recursivamente hasta la profundidad especificada.
const arr5 = [1, 10,[2, [3, 4]], 5];
console.log(arr5.flat());
console.log(arr5.flat(2));

//flatMap() - primero mapea cada elemento usando una función de mapeo, luego 
// aplana el resultado en un nuevo array.
const plano = arr1.flatMap(n => [n, n * 10]);
console.log(plano);

//iterable() - devuelve un nuevo array que es un iterador de los elementos 
// del array.
for (const [i,v] of arr2.entries()) {
    console.log(`arr2[${i}] = ${v}`);
}

//some() devuelve true si al menos un elemento del array cumple la 
// condición implementada por la función dada, mientras que every() devuelve true 
// si todos los elementos del array cumplen la condición.
console.log(arr1.some(n => n > 3));
console.log(arr2.every(n => n > 0));

//Metodos para agregar, eliminar y modificar elementos.

//push() - agrega uno o más elementos al final de un array y devuelve la nueva 
// longitud del array.
arr1.push(5);
console.log(arr1);

//pop() - elimina el último elemento de un array y lo devuelve. Este método cambia
// la longitud del array.
const ultimo = arr1.pop();
console.log(ultimo);
console.log(arr1);

//shift() - elimina el primer elemento de un array y lo devuelve. Este método
// cambia la longitud del array.
const primero = arr1.shift();
console.log(primero);
console.log(arr1);

//unshift() - agrega uno o más elementos al inicio de un array y devuelve la nueva
// longitud del array.
arr1.unshift(0);
console.log(arr1);

//splice() - cambia el contenido de un array eliminando elementos existentes y/o
// agregando nuevos elementos.
const arr6 = [1, 2, 3, 4, 5];
// Eliminar elementos
arr6.splice(2, 1);
console.log(arr6);
// Agregar elementos
arr6.splice(2, 0, 10, 11);
console.log(arr6);
// Reemplazar elementos
arr6.splice(2, 2, 20, 21);
console.log(arr6);

//Metodps para ordenar y modificar.

//sort() - ordena los elementos de un array en su lugar y 
// devuelve el array ordenado.
const arr7 = [5, 2, 8, 1, 9];
arr7.sort((a, b) => a - b);
console.log(arr7);

//toSorted() - devuelve una copia ordenada de los elementos de un array 
// sin modificar el array original.
const arr8 = [5, 2, 8, 1, 9];
const arr9 = arr8.toSorted((a, b) => a - b);
console.log(arr8); // Original
console.log(arr9); // Nuevo

//reverse() - invierte el orden de los elementos de un array in situ. El primer
// elemento pasa a ser el último y el último pasa a ser el primero.
const a1 = [...arr1];
a1.reverse();
console.log(a1);

//toReversed() - devuelve una copia de un array con los elementos en orden inverso
// sin modificar el array original.
const a2 = [...arr2];
const a3 = a2.toReversed();
console.log(a2);    // Original
console.log(a3);    // Nuevo

//fill() Cambia todos los elementos de un array por un valor estático, desde el índice
// de inicio (por defecto 0) hasta el índice de fin (por defecto array.length). Devuelve el array modificado.
const arr10 = [1, 2, 3, 4, 5];
arr10.fill(0, 1, 4);
console.log(arr10);

//copyWithin() - copia una parte del array a otra ubicación dentro del mismo 
// array y lo devuelve sin modificar su tamaño.
const arr11 = [1, 2, 3, 4, 5];
arr11.copyWithin(0, 3);
console.log(arr11);

//with() - devuelve un nuevo array con un elemento reemplazado en una 
// posición específica, sin modificar el array original.
const arr12 = [1, 2, 3, 4, 5];
const arr13 = arr12.with(2, 10);
console.log(arr13);
console.log(arr12);

//toSpliced() - devuelve un nuevo array con elementos eliminados y/o agregados,
// sin modificar el array original.
const arr14 = [1, 2, 3, 4, 5];
const arr15 = arr14.toSpliced(2, 1, 10, 11);
console.log(arr14);
console.log(arr15);

//Arrays de copias y combinaciones.

//slice() - devuelve una copia de una parte del array dentro de un nuevo array,
// sin modificar el array original.
const copia1 = arr1.slice(1, 3);
console.log(copia1);
console.log(arr1);

//concat() - se utiliza para unir dos o más arrays. Este método no cambia 
// los arrays existentes, sino que devuelve un nuevo array.
const combinado2 = arr1.concat(0, arr2, 22);
console.log(combinado2);

//spread operator (NO ES UN METODO) - se utiliza para expandir elementos de 
// un array en lugares donde se esperan cero o más elementos.
const combinado3 = [...arr1, ...arr2, 22];
console.log(combinado3);

//array.from() - crea una copia de un array.
const fr2 = Array.from(arr1);
console.log(fr2);
console.log(arr1);

const fr3 = Array.from(arr2, n => n * 2);
console.log(arr2);
console.log(fr3);

//flat() - devuelve un nuevo array con todos los elementos de sub-array concatenados
// recursivamente hasta la profundidad especificada.
const arr16 = [1, 10,[2, [3, 4]], 5];  
const arr17 = arr16.flat(2);
console.log(arr16);
console.log(arr17);

//Variaciones con lenguaje corto (usando spread operator).
const copia2 = [...arr1]; //Copiar un array usando spread operator.
console.log(copia2);

const unir1 = [...arr1, ...arr2]; //Unir dos arrays usando spread operator.
console.log(unir1);

const conInsertar = [...arr1.slice(0, 2), 10, ...arr1.slice(2)]; //Insertar un elemento en un array usando spread operator.
console.log(conInsertar);

const reemplazar = [...arr1.slice(0, 2), 20, ...arr1.slice(3)]; //Reemplazar un elemento en un array usando spread operator.
console.log(reemplazar);

const quitar = [...arr1.slice(0, 2), ...arr1.slice(3)]; //Quitar un elemento de un array usando spread operator.
console.log(quitar);

// Acceso y utilidades.

//at() - devuelve el elemento en la posición dada, permitiendo índices negativos 
// para contar desde el final del array.
console.log(arr1.at(2));
console.log(arr1.at(-1));

//join() - une todos los elementos de un array en una cadena y devuelve esta 
// cadena.
const cadena1 = arr2.join(', ');
console.log(cadena1);

//toString() - devuelve una cadena que representa al array y sus elementos.
const cadena2 = arr1.toString();
console.log(cadena2);

//toLocaleString() - devuelve una cadena que representa a los elementos del array
// utilizando sus métodos toLocaleString individuales.
const fecha = new Date();
const cadena3 = fecha.toLocaleString();
console.log(cadena3);

const arr18 = [1000.5, 2000.75, 3000.25];
console.log(arr18.toLocaleString('es-CO'));

//entries() - devuelve un nuevo objeto Array Iterator que contiene los pares 
// clave/valor para cada índice del array.
const iterador = arr1.entries();
for (const [i, v] of iterador) {
    console.log(`arr1[${i}] = ${v}`);
}

//keys() - devuelve un nuevo objeto Array Iterator que contiene las claves de 
// los índices para cada elemento del array.
const claves = arr2.keys();
for (const k of claves) {
    console.log(k);
}

//values() - devuelve un nuevo objeto Array Iterator que contiene los valores
// para cada elemento del array.
const valores = arr2.values();
for (const v of valores) {
    console.log(v);
}

//length (ES UNA PROPIEDAD NO UN METODO) - devuelve la longitud del array.
console.log(arr1.length);
console.log(arr2.length);
console.log(arr1.length + arr2.length);

arr1.length = 2; // Modificar la longitud de un array.
console.log(arr1);