export const getMonthText = (value: number) => {
  switch (value) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Arbil";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Dicembre";
  }
};

export const validarFecha = (value: string): boolean => {
  const partes = value.split("-");
  if (partes.length !== 3) return false;
  const diaInt = parseInt(partes[2]);
  const mesInt = parseInt(partes[1]);
  const anioInt = parseInt(partes[0]);
  if (isNaN(diaInt) || isNaN(mesInt) || isNaN(anioInt)) return false;
  if (mesInt < 1 || mesInt > 12) return false;
  //JS adapta la fecha a una real, modificandola si es necesario, para el futuro
  const fecha = new Date(anioInt, mesInt - 1, diaInt);
  const esFechaReal =
    fecha.getFullYear() === anioInt &&
    fecha.getMonth() === mesInt - 1 &&
    fecha.getDate() === diaInt;
  if (!esFechaReal) return false;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fecha < hoy) return false;
  return true;
};

export const validarTelef = (value: string) => {
  const regexTel = /^[6-9]\d{8}$/;
  console.log(value);
  console.log(regexTel.test(value.trim()));
  return regexTel.test(value.trim());
};

export const valudarEnteros = (value: string) => {
  const valor = parseInt(value);
  return !isNaN(valor) && valor > 0 && valor < 8;
};
