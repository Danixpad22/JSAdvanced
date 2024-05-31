const axios = require('axios');

const elementoListaNotizie = document.getElementById('lista-notizie');
const bottoneCaricaAltro = document.getElementById('bottone-carica-altro');
const dimensionePagina = 10;
let paginaCorrente = 0;

// Funzione per caricare le notizie
const caricaNotizie = () => {
    const inizio = paginaCorrente * dimensionePagina;
    const fine = inizio + dimensionePagina;

    // Ottenere gli ID delle notizie
    axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then(rispostaIdNotizie => {
            const idNotizie = rispostaIdNotizie.data;
            const idNotizieCorrenti = idNotizie.slice(inizio, fine);
            const promesseDettagli = idNotizieCorrenti.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
            return Promise.all(promesseDettagli);
        })

        // Quando Promise.all(promesseDettagli) si risolve, passa l'array dei risultati alla funzione .then.
        // dettagliNotizie rappresenta questo array di risultati. 
        .then(dettagliNotizie => {
            // Creare e aggiungere elementi HTML per ogni notizia alla lista
            dettagliNotizie.forEach(risposta => {
        // Axios standardizza la struttura delle risposte e mette i dati effettivi della risposta nella proprietà data dell'oggetto risposta.
         // const notizia = risposta.data; estrae quindi i dati della notizia dalla risposta e li assegna alla variabile notizia.
                const notizia = risposta.data;
                console.log(notizia)
                const elementoLista = document.createElement('li');
                const link = document.createElement('a');
                //assegnamo la proprieta url ad a appena creata
                link.href = notizia.url;
                link.textContent = notizia.title; //assegna titolo
                link.target = '_blank';
                const data = document.createElement('p');
                // Moltiplicare notizia.time per 1000 (notizia.time * 1000) converte il valore da secondi a millisecondi.
                data.textContent = new Date(notizia.time * 1000).toLocaleString(); //Questo è un metodo dell'oggetto Date in JavaScript che converte la data e l'ora in una stringa leggibile, formattata secondo le impostazioni locali del browser.

                elementoLista.appendChild(link);
                elementoLista.appendChild(data);
                elementoListaNotizie.appendChild(elementoLista);
            });

            // Incrementare il numero di pagina per il caricamento successivo
            paginaCorrente++;
        })
        .catch(errore => console.error('Errore nel caricamento delle notizie:', errore));
};

// Aggiungere un ascoltatore per il click sul pulsante "Carica altro"
bottoneCaricaAltro.addEventListener('click', caricaNotizie);

// Avviare il caricamento delle notizie al caricamento della pagina
caricaNotizie();
