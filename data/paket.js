export let paketSewa = '' || JSON.parse(localStorage.getItem('paket'));

if(document.querySelector('.pilih-garasi')){
    fetch("../php/get-all-paket.php")
      .then(response => response.json())
      .then(data => {
        const paket = data;
        localStorage.setItem('paket', JSON.stringify(paket));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
} else {
    fetch("./php/get-all-paket.php")
      .then(response => response.json())
      .then(data => {
        const paket = data;
        localStorage.setItem('paket', JSON.stringify(paket));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
}