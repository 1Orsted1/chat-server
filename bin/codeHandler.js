const operationString = (n) => {
  const size = n.length;
  const arrayN = [];
  var x = 0;
  while (x < size) {
    arrayN.push(n.charCodeAt(x));
    x++;
  }
  const result = concat(arrayN);
  return result;
};

const concat = (numberArray) => {
  var result = 0;
  for (var x = 0; x < numberArray.length; x++) {
    result += numberArray[x];
  }
  return result;
};

function getCodigoGrupo(props) {
  const nombre = operationString(props.nombreGrupo);
  const creador = operationString(props.creador);
  const carrera = operationString(props.carrera);

  const n = props.nombreGrupo.replace(/ /g, "");
  const cr = props.creador.replace(/ /g, "");
  const ca = props.carrera.replace(/ /g, "");

  const first = n.substring(2, 6);
  const next = cr.substring(props.creador.length - 2, props.creador.length);
  const last = ca.substring(props.carrera.length - 1, props.carrera.length);

  const number = Math.round((nombre * creador) / carrera);
  const codigo = last + first + last + next + number;
  return codigo;
}

module.exports = { getCodigoGrupo };
