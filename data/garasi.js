export let garasi = '' || JSON.parse(localStorage.getItem('garasi'));

if(document.querySelector('.pilih-garasi')){
    fetch("../php/get-all-garasi.php")
      .then(response => response.json())
      .then(data => {
        const garasi = data; 
        localStorage.setItem('garasi', JSON.stringify(garasi));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
} else {
    fetch("./php/get-all-garasi.php")
      .then(response => response.json())
      .then(data => {
        const garasi = data; 
        localStorage.setItem('garasi', JSON.stringify(garasi));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
}