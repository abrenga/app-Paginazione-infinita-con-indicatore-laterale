const blog = {
    currentPage: 0,
    itemsPerPage: 5,
    totalLoadedPages: 0,
    totalPage: 0,
    blogWrapper: document.getElementById('blog-w'),
    pagePositionWrapper: document.getElementById('page-position-w')
};

(async function initBlog() {
    let postData = await fetch('https://jsonplaceholder.typicode.com/POSTS');
    blog.posts = await postData.json();
    blog.posts.splice(25,75);
    blog.totalPage = Math.ceil(blog.posts.length / blog.itemsPerPage);
    showPosts();
    initIndicatoriInpaginazione();
})();





function showPosts() {

    let start = blog.currentPage * blog.itemsPerPage;
    for (var i = start; i < start + blog.itemsPerPage; i++) {
        let Dom_post = document.createElement('article');
        Dom_post.setAttribute('class', 'blog-post');
        Dom_post.innerHTML = createPostHTML(blog.posts[i]);
        blog.blogWrapper.appendChild(Dom_post);
    }
    if (blog.currentPerPage < blog.totalPage) {
        blog.totalLoadedPages++;
    }else {
        blog.totalLoadedPages--;
    }
}

/*function initPosts() {
    let i = 0;
    while (document.documentElement.scrollHeight == document.documentElement.clientHeight) {
        let Dom_post = document.createElement('article');
        Dom_post.setAttribute('class', 'blog-post');
        Dom_post.innerHTML = createPostHTML(blog.posts[i]);
        blog.blogWrapper.appendChild(Dom_post);
        i++;
    }

    return i + 1;
}*/

function initIndicatoriInpaginazione() {
    for (let i = 0; i < blog.totalPage; i++) {
        let classi = 'position';
        i === 0 ? classi += ' active' : '';
        
        let position = document.createElement('span');
        position.setAttribute('class', classi);
        blog.pagePositionWrapper.appendChild(position);
    }
}



function createPostHTML({ id, title, body }) {
    return `<h3 class="title">${title}</h3>
    <div class="body">${body}</div>
    <div class="info">${id}</div>`;

}


window.addEventListener( 'scroll', (e) => {
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    let maxScroll = scrollHeight - clientHeight;
    let dimensioneSoglia = (blog.totalPage/blog.itemsPerPage)-scrollHeight;
    if ((scrollTop >= maxScroll) && (blog.currentPage <= blog.totalPage )) {
        blog.currentPage++;
        showPosts();
        sendIndicatoreAttivo();
    }else if((dimensioneSoglia < maxScroll )&&( blog.currentPage >= 1) ){
        blog.currentPage--;
        sendIndicatoreAttivo();
    }


    /*let dimensioneSoglia = maxScroll / blog.totalLoadedPages;
    if (scrollTop < (maxScroll - (dimensioneSoglia * blog.currentPage)) && blog.currentPage > 1) {
        blog.currentPage--;
        sendIndicatoreAttivo();
    }*/
});

function sendIndicatoreAttivo() {
    let indicatori = document.querySelectorAll('span.position');
    indicatori.forEach((indicatore,i) => {
        if(blog.currentPage==i){
            indicatore.setAttribute('class','position active');
        }else{
            indicatore.setAttribute('class','position');
        }
    });
}