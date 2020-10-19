

function saveJs(filename, data) {
  const element = document.createElement('a');
  const datafile = new Blob([data], { type: 'text/plain' });
  element.href = URL.createObjectURL(datafile);
  element.download = `${filename}.js`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

export default {
  saveJs,
};
