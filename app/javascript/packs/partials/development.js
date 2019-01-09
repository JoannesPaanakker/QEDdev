function clearPage() {
  document.getElementById('dev2').addEventListener("click", clear);
  console.log('kk');
}

function clear() {
  document.write(5 + 6);
  window.alert("Het scherm wordt gewist")
}

export { clearPage };
