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