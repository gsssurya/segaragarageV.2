export let riwayatSewa = '' ||  JSON.parse(localStorage.getItem('riwayatSewa'));

if(document.querySelector('.pilih-garasi')){
    fetch("../php/get-all-riwayat.php")
      .then(response => response.json())
      .then(data => {
        const garasi = data; 
        localStorage.setItem('riwayatSewa', JSON.stringify(garasi));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
} else {
    fetch("./php/get-all-riwayat.php")
      .then(response => response.json())
      .then(data => {
        const garasi = data; 
        localStorage.setItem('riwayatSewa', JSON.stringify(garasi));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
}
console.log(riwayatSewa)