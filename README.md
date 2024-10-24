# ProvaPratica

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Generazione mappa

-[x] selezione della percentuale di caselle per tipo -[x] validazione del form sui campi richiesti e che le percentuali vadano dal 10 al 33
nota: in caso di percentuale totale inferiore al 100% le caselle mancanti vengono aggiunte casualmente in maniera equa tra i tre tipi

-[x] selezione della grandezza della mappa

-[] zona di mare e di contigue -[x] generazione che rispetta il più fedelemente possibile le percentuali selezionate dal giocatore

Movimento del personaggio

-[] Il personaggio compare al centro della mappa inizialmente.

-[] Il personaggio può essere mosso con le frecce direzionali della tastiera.

-[] Non è possibile muoversi sulle caselle di mare.

Interazione con l'Erba:

-[] Ogni volta che il personaggio si sposta su una casella d'erba, c'è una
probabilità del 20% che compaia un Pokémon.

-[] I Pokémon catturati vengono immediatamente aggiunti alla lista dei Pokémon
catturati.

Requisiti di Visualizzazione:

-[] Mappa: Visualizza la mappa di gioco con il personaggio e le diverse zone.

-[] Log: Mostra le azioni recenti del giocatore (ad esempio, "Hai catturato un Pokémon!").

-[] Lista dei Pokémon Catturati: Elenca tutti i Pokémon catturati dal giocatore.

Funzionalità Aggiuntive:

-[] LocalStorage: Tutte le informazioni di gioco (posizione del personaggio, Pokémon
catturati, log delle azioni) devono essere salvate nel localStorage del browser per
persistenza dei dati.

-[] Esportazione dello Stato del Gioco: Pulsante per esportare lo stato corrente del
gioco in un file JSON.

-[] Importazione dello Stato del Gioco: Possibilità di caricare un file JSON per
importare uno stato del gioco salvato precedentemente durante la fase di
generazione della mappa.

Parti mancanti e idee sullo sviluppo:

Per lo sviluppo del gioco e dei movimenti del personaggio andrei a ristrutturare l'attuale creazione della griglia,
quindi al posto di un array della lunghezza della quantitá totale di caselle lo trasformerei in un array di
righe (ogni riga sarà un array composto dalle singole caselle);
in questo modo semplificherei il tracciamento e il posizionamento del personaggio sulla griglia,
andandolo a spostare di posizione in posizione nei vari array, oltre a ciò sarebbe più semplice anche riconoscere sul tipo di casella su cui si trova attualmente.

Ricapitolando avrei due array di array, uno per la griglia e struttura della mappa e uno per le coordinate del giocatore,
ogni qual volta che il giocatore si muove verifico le sue prossime coordinate sull'array della struttura, se la casella corrispondente è di tipo acquatico non faccio nulla in attesa del prossimo input,
nel caso in cui la casella sia invece di tipo terreno/erboso procederei al cambio delle coordinate del giocatore nel suo array,
e se di tipo erboso lancerei un evento che in base alla percentuale di incontro di un pokemon (calcolato con un Math.random) avvia l'evento col pokemon.

L'evento del pokemon lo gestirei in maniera testuale, ne pescherei uno a caso da un array di nomi dei mostri,
mostrerei tale nome nella parte sinistra della pagina di gioco con sotto due bottoni, uno per la fuga ed evitare il confronto, uno per la cattura.
La cattura sarebbe gestita da una percentuale di successo, in caso di successo lo aggiungerei ad un array di pokemon catturati, in caso di insuccesso il pokemon fugge e si torna sul movimento della mappa.
Durante l'evento di incontro bloccherei i movimenti sulla mappa.

Funzione di salvataggio su localStorage, aggiungerei un bottone che salverebbe i dati attuali della partita, questi stessi dati sarebbero ricaricabili con un ulteriore bottone sulla pagina del form,
una volta cliccato quest'ultimo prendo i dati da local storage, se sono presenti li caricherei su un service apposito e cambierei la pagina del gioco.
