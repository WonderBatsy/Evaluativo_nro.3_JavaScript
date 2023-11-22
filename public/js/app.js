/*

Evaluativo nro. 3
Cátedra: JavaScript
Alumno: Manuel Paz
Cédula: 28.264.712
Sección: N-1113P

*/

$(document).ready(function () {

  // Al cargar el documento, se llama a la función loadCars()

  loadCars();

});

function addCar() {
  
  // Se obtienen los valores de los campos del formulario

  const descripcion = $('#descripcion').val();
  const marca = $('#marca').val();
  const modelo = $('#modelo').val();
  const tipo = $('#tipo').val();
  const ano = $('#ano').val();

  // Se obtiene la URL de la imagen subida

  const imagen = getUploadedFileUrl();

  // Si no se ha subido una imagen, se interrumpe la función

  if (!imagen) {

    return;

  }

  // Se crea un objeto con los datos del automóvil

  const carData = {

    descripcion: descripcion,
    marca: marca,
    modelo: modelo,
    tipo: tipo,
    ano: ano,
    imagen: imagen

  };

  // Se obtienen los automóviles almacenados en el almacenamiento local

  const cars = getCarsFromLocalStorage();

  // Se agrega el nuevo automóvil a la lista existente

  cars.push(carData);

  // Se guarda la lista actualizada en el almacenamiento local

  saveCarsToLocalStorage(cars);

  // Se muestra un mensaje de éxito usando la librería Swal (SweetAlert2)

  Swal.fire({

    title: '¡Registro exitoso!',
    text: 'El vehículo ha sido registrado',
    icon: 'success',
    width: 450,
    padding: '1em',
    color: 'black',
    background: '#fff',
    confirmButtonColor: '#f67a2d',
    focusConfirm: false,
    confirmButtonText: 'Aceptar'

  })

  // Se actualiza la visualización de los automóviles

  displayCars(cars);

  // Se limpia el formulario después de agregar un automóvil

  clearForm();

}

function getUploadedFileUrl() {

  // Se obtiene el elemento de entrada de archivos

  const fileInput = document.getElementById('imagen');

  // Si se ha seleccionado un archivo

  if (fileInput.files.length > 0) {

    const file = fileInput.files[0];

    // Si no hay archivo, se devuelve una cadena vacía

    if (!file) {
      
      return '';

    }

    // Se genera un identificador único para el archivo

    const fileId = 'carimagen_' + Date.now();

    // Se guarda el archivo en el almacenamiento local

    saveFileToLocalStorage(fileId, file);

    // Se devuelve el identificador del archivo

    return fileId;

  }

  // Si no se ha seleccionado un archivo, se devuelve una cadena vacía

  return '';
}

function saveFileToLocalStorage(key, file) {

  // Se utiliza FileReader para leer el contenido del archivo como una URL de datos

  const reader = new FileReader();

  // Cuando la lectura del archivo está completa

  reader.onload = function (event) {

    // Se obtiene el resultado de la lectura (URL de datos)

    const fileData = event.target.result;

    // Se guarda el archivo en el almacenamiento 
    
    localStorage.setItem(key, fileData);

    // Se obtienen los automóviles almacenados en el almacenamiento local y se actualiza la visualización

    const cars = getCarsFromLocalStorage();
    displayCars(cars);

  };

  // Se lee el contenido del archivo como una URL de datos

  reader.readAsDataURL(file);

}

function loadCars() {

  // Se obtienen los automóviles almacenados en el almacenamiento local y se actualiza la visualización

  const cars = getCarsFromLocalStorage();
  displayCars(cars);

}

function displayCars(cars) {

  // Se obtiene el elemento contenedor de la lista de automóviles

  const carList = $('#carList');

  // Se vacía el contenido actual del contenedor

  carList.empty();

  // Por cada automóvil en la lista, se crea un elemento de lista y se agrega al contenedor

  cars.forEach(function (car, index) {

    const carItem = $('<div>');
    carItem.append(`<p><strong>Marca:</strong> ${car.marca}</p>`);
    carItem.append(`<p><strong>Modelo: </strong> ${car.modelo}</p>`);
    carItem.append(`<p><strong>Tipo: </strong> ${car.tipo}</p>`);
    carItem.append(`<p><strong>Año: </strong> ${car.ano}</p>`);
    carItem.append(`<p><strong>Descripción: </strong> ${car.descripcion}</p>`);
    carItem.append(`<img src="${getLocalFileUrl(car.imagen)}" alt="${car.modelo}">`);
    carItem.append(`<button class="eliminar" onclick="deleteCar(${index})">Eliminar vehículo</button>`);
    carList.append(carItem);

  });

}

function getLocalFileUrl(key) {

  // Se obtiene la URL del archivo almacenado en el almacenamiento local

  return localStorage.getItem(key) || '';

}

function deleteCar(index) {

  // Se obtienen los automóviles almacenados en el almacenamiento local

  const cars = getCarsFromLocalStorage();

  // Se elimina el automóvil en la posición especificada por el índice

  cars.splice(index, 1);

  // Se guarda la lista actualizada en el almacenamiento local

  saveCarsToLocalStorage(cars);

  // Se recarga la visualización de los automóviles

  loadCars();

}

function getCarsFromLocalStorage() {

  // Se obtiene la cadena JSON que representa la lista de automóviles del almacenamiento local

  const carsString = localStorage.getItem('cars');

  // Si la cadena existe, se convierte en un array de objetos; de lo contrario, se devuelve un array vacío

  return carsString ? JSON.parse(carsString) : [];

}

function saveCarsToLocalStorage(cars) {

  // Se convierte la lista de automóviles a una cadena JSON y se guarda en el almacenamiento local

  localStorage.setItem('cars', JSON.stringify(cars));

}

function clearForm() {

  // Se limpian los valores de los campos del formulario

  $('#descripcion').val('');
  $('#marca').val('');
  $('#modelo').val('');
  $('#tipo').val('');
  $('#ano').val('');
  $('#imagen').val('');

}

function clearAllData() {

  // Se elimina la clave 'cars' del almacenamiento local y se recarga la visualización de los automóviles

  localStorage.removeItem('cars');
  loadCars();

}