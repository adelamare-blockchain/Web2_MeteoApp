const langueParDefaut = 'fr'; // Langue par défaut
// let langueBg = 'en'; // Langue pour la modification du background
let villeChoisie = 'Paris'; // Ville par défaut

// Récupération de l'heure actuelle
const date = new Date();
const heure = date.getHours();

recevoirMeteo(villeChoisie);

// Récupération des informations de l'utilisateur
document.querySelector('#changer').addEventListener('click', () => {
    villeChoisie = prompt('Quelle ville souhaitez-vous voir ?');
    if(villeChoisie !== null && villeChoisie !== '') {
        verifierVille(villeChoisie);
    } else {
        verifierVille();
    }
});

// Vérification de validité de la ville
function verifierVille(ville) {
    // Envoie une requête à l'API OpenWeather pour vérifier si la ville existe
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid={API key}&units=metric&lang=fr`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ville non trouvée');
        }
        recevoirMeteo(ville);
      })
      .catch(error => {
        alert(`Veuillez réessayer.\n${error}`);
      });
  }

// Appeler la fonction recevoirTemperature(ville)
function recevoirMeteo(ville){

    // Récupération de l'url de l'API
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid={API key}&units=metric&lang=' + langueParDefaut;

    // Etape 2 : créer une requete
    let requete = new XMLHttpRequest(); // Créer un objet
    requete.open('GET', url); // Premier paramètre GET ou POST, deuxieme paramètre : url
    requete.responseType = 'json'; // Nous attendons du JSON
    requete.send(); // Nous envoyons notre requête
    
    // Dès qu'on recoit une réponse, cette fonction est executée
    requete.onload = function() {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                // Error 200 ==> Page affichée correctement
                let reponse = requete.response; // Stocke la reponse
                let temperature = reponse.main.temp;
                let ville = reponse.name;
                let temps = reponse.weather[0].description;
                let backgroundImage = reponse.weather[0].main;
                let icone = reponse.weather[0].icon;
                let iconeElement = document.querySelector('#icone');
                let background = document.querySelector('#background');

                // Afficher les éléments
                document.querySelector("#temperature_label").textContent = temperature;
                document.querySelector("#ville").textContent = ville;
                document.querySelector("#temps").textContent = temps;

                // Vérification s'il fait jour ou nuit
                const isJour = heure >= 6 && heure < 20;
                icone = isJour ? icone.replace('n', 'd') : icone;
                iconeElement.src = 'https://openweathermap.org/img/wn/' + icone + '.png';
                iconeElement.style.width = '200px';

                // Ajouter la classe "fade-out"
                // background.classList.add('fade-out');

                // Modification du background en fonction du temps
                if (backgroundImage.includes('Thunderstorm')) {
                    background.style.backgroundImage = "url('https://images.pexels.com/photos/680940/pexels-photo-680940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                } else if (backgroundImage.includes('Drizzle')) {
                    background.style.backgroundImage = "url('https://images.pexels.com/photos/7002973/pexels-photo-7002973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                } else if (backgroundImage.includes('Rain')) {
                    background.style.backgroundImage = "url('https://images.pexels.com/photos/5264122/pexels-photo-5264122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                } else if (backgroundImage.includes('Snow')) {
                    background.style.backgroundImage = "url('https://images.pexels.com/photos/1032654/pexels-photo-1032654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                } else if (backgroundImage.includes('Clear')) {
                    background.style.backgroundImage = "url('https://images.pexels.com/photos/2043035/pexels-photo-2043035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                } else if (backgroundImage.includes('Clouds')) {
                    background.style.backgroundImage = "url('https://images.pexels.com/photos/5248469/pexels-photo-5248469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                } else {
                    // reponse.weather[0].main = "Atmosphere" (Group 7xx);
                    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/691031/pexels-photo-691031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                }
                // // Attendre la fin de la transition (500ms) avant de retirer la classe "fade-out"
                // setTimeout(() => {
                //     background.classList.remove('fade-out')}, 500);
            } else {
                alert('Un problème est survenu, merci de revenir plus tard.');
            }
        }
    }
    console.log('La météo de ' + ville + ' est actualisée');
    }
