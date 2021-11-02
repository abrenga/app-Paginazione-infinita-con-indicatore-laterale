const blog = {/*inseriamo tutto il file nell'oggetto javascript  */
    blogWrapper: document.getElementById('blog-w'), 
    pagingWrapper: document.getElementById('page-position-w'),
    posts: null, /*fissiamo i post dentro non c'è nulla */
    postPerPage: 8,/*quanti post inserisco in una singola pagina */
    currentLoadedPages: 0, /*la pagina attualemnte caricata */

    /*chiamiamo una funzione asincrona dove recuperiamo il file json
    in realta tale elemento dell'oggetto ha il compito di inizializzare il blog*/
    init: async function() {
        let postData = await fetch('https://jsonplaceholder.typicode.com/POSTS');
        this.posts = await postData.json();
        this.showPage();/*quindi mostrerà le pagine e genererà l'evento  */
        const that = this;/*un piccolo giochetto per usare this nell'evento */
        window.addEventListener("scroll", (event) => {
            this.onBlogScroll(event, that);
        });
    },

    /*altro elemento dell'oggetto avrà una funzione che si occuperà di svolgere la visualizzazione delle pagine*/
    showPage: function() {
        const startingIndex = this.currentLoadedPages * this.postPerPage;/*per caricare le pagine dobbiamo calcolare un indice di partenza.
        come?
        calcolando la pagina corrente * il totale di post per pagina
        specificando che se il post[i]  inizia da 0 e finche i è minore del totale dei post per pagina poi incrementa
        */
        for (let i = 0; i < this.postPerPage; i++) {
            this.showPost(i + startingIndex);/*mostra di seguito i posts+l'attuale indice
            . ciò serve per avanzare le pagine e indicizzarli */
        }

        this.currentLoadedPages++;/*infatti qui avanziamo con la pagine */

        this.disablePagingMarkers();
        this.addPagingMarker();
    },

    showPost: function(postIndex) {/*questo elemento  mostra i posts */
        let post = this.posts[postIndex];
/*creando i post gli creamo anche lo spazio HTML */
        let postDom = document.createElement("article");
        postDom.setAttribute("class", "blog-post");
        postDom.innerHTML = this.createPostHtml(post);/*lo inseriamo nel HTML con una funzione */

        this.blogWrapper.appendChild(postDom);
    },

    createPostHtml: function(post) {/*qui li creaiamo e dentro mettiamo l'HTML */
        return `<h3 class="title">${post.title}</h3>
            <div class="body">${post.body}</div>
            <div class="info">${post.id}</div>`;
    },
/*creiamo un evento passando cme parametro l'evento */
    onBlogScroll: function(event, context/*si riferisce al blog che però non possiamo chiamare this perche si riferirebbe all'evento */) {
        const maxScroll = document.documentElement.scrollTopMax;/*ora quando sobbiamo aggiungere post?
        ovviao, quando tutta lo scroll è infondo alla pagina. 
        quando quindi scrollTop è al massimo
        come lo calcoliamo maxScroll?
        sottraendo al massimo documento il totale della barra scrollabile */
        const currentScroll = document.documentElement.scrollTop;

        if (currentScroll >= maxScroll) {/*ovviamente se scrollTop è maggiore dello scorrimento massimo aggiungiamo i post */
            context.showPage();
        }
        else {
            /*dobbiamo fare in modo che sappia da dove partire dividiamo lo scroll totale in tante piccole sezioni per orientarci nelle pagine */
            const markerThreshold = maxScroll / context.currentLoadedPages;
            
            let index = 0;/*fissiamo un indice a 0 mentre currentScroll(ovvero scrollTop) è maggiore del indice da dove siamo rimasti moltiplicato per la sezione della pagina in cui siamo */
            while (currentScroll >= index * markerThreshold) {
                index++; /*se si verifica la condizione si incrementa */
            }

            context.disablePagingMarkers();
            context.enablePagingMarker(index - 1);
        }
    },

    disablePagingMarkers: function() {/* */
        const markers = document.querySelectorAll("span.position");
        markers.forEach((marker, index) => {
            marker.setAttribute("class", "position");
        });
    },

    enablePagingMarker: function(index) {
        const markers = document.querySelectorAll("span.position");
        markers.forEach((marker, i) => {
            if (index == i) {
                marker.setAttribute("class", "position active");
            }
        });
    },

    addPagingMarker: function() {/*aggiungi contatore in questo punto creiamo l'elemento span che conterrà il contatore e assegnamo una classe */
        const marker = document.createElement("span");
        marker.setAttribute("class", "position active");
        this.pagingWrapper.appendChild(marker);
    }
}

blog.init();/*invochiamo l'inizializzazione */