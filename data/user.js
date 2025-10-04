export let user = '' || JSON.parse(localStorage.getItem('users'));

if(document.querySelector('.pilih-garasi')){
    fetch("../php/get-all-user.php")
      .then(response => response.json())
      .then(data => {
        const user = data; // semua data user dari database
        localStorage.setItem('users', JSON.stringify(user));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
} else {
    fetch("./php/get-all-user.php")
      .then(response => response.json())
      .then(data => {
        const user = data; // semua data user dari database
        localStorage.setItem('users', JSON.stringify(user));
      })
      .catch(error => {
        console.error("Gagal mengambil data user:", error);
      });
}