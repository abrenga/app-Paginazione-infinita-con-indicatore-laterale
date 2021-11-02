/*Cosa devo fare?
-devo far in modo di visualizzare i post 
-come?
recupero i post che hanno titolo, corpo e id
*/


const blog = {
    currentPage: 0,
    itemsPerPage: 8,
    blogWrapper: document.getElementById('blog-w'),
    pagePositionWrapper: document.getElementById('page-position-w')
};

(async function initBlog () {
    let postData = await fetch('https://jsonplaceholder.typicode.com/POSTS');
    blog.posts = await postData.json();
    blog.posts.splice(40, 75);
    showPosts();
})();

function showPosts () {
    let start = blog.currentPage * blog.itemsPerPage;/*per caricare i post nella pagina è necessario moltiplicare la pagina attualmente caricata * i post presenti sulla pagina queste */
    for (let i = start; i < start + blog.itemsPerPage; i++) {/*i sarà uguale al signolo post caricato sulla pagina che inizialmente è 0 poi se rimane verificata la condizzione viene incrementato. ogni singola pagina in questo caso verrà incrementata di 1 con dentro 8 post */
        post_Dom = document.createElement('article');
        classi = 'blog-post';
        post_Dom.setAttribute('class', classi);
        post_Dom.innerHTML = createPostHTML(blog.posts[i]);/*tutto il for serve per questo momento ovvero inpiantare nell'html, nella posizone atricle una funzione che genera ogni singolo post ecco perchè blog.posts(che è un ARRAY)[[i] dove i è singolo elemento dell'array ovvero singolo post  */
        blog.blogWrapper.appendChild(post_Dom);
    }
};


function createPostHTML({ id, title, body }) {/* questa function deve per forza ritornare html in quanto viene inserita in post_Dom.innerHTML che si aspetta dell'HTML */
    return `<h3 class="title">${title}</h3>
    <div class="body">${body}</div>
    <div class="info">${id}</div>`;
};


window.addEventListener('scroll', (e) => {  /*creiamo l'evento allo scroll ovvero, quando scrollo deve aggiungere altre pagine.
come?
ogni volta che lo scroll è in fondo aggiungi altri post(8 nel nostro caso)
p.s tieni presente che l'aggiunta dei posti avviene in showPosts() 
devi quindi avviare l'evento. 
se la barra dello scroll è tutta giù aggiungi.
come lo fai quindi?
come calcolo lo scroll della pagina?
con scrollTop che se è uguale a 0 sta su.
devo quindi paragonarlo allo scroll massimo
come posso calcolare lo scroll massimo?
facendo scrollHeight(che è lo scrollo di tutto il div)-clientHeight (che è invece tutto il broswer)
a questo punto se scrollTop è maggiore uguale dello scorrimento massimo allora dobbiamo aggiungere altre pagine e mostrare altri post
*/
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    let scrollMax= scrollHeight-clientHeight;
    if(scrollTop >= scrollMax) {
        blog.currentPage++;
        showPosts ();
    }

});



/*Ora dobbiamo creare un indicatore di pagine. l'indicatore di pagina ci indica esattamente in che punto della pagina ci troviamo */

