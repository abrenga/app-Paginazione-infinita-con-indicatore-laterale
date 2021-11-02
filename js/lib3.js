let blog = {
    blogWrapper: document.getElementById('blog-w'),
    currentPage: 0,
    totalPerPages: 8,

    init: async function () {
        let postFile = await fetch('https://jsonplaceholder.typicode.com/POSTS');
        this.posts = await postFile.json();
        let that = this
        this.showPage();
        window.addEventListener('scroll', (e) => {
            this.onBlogScroll(e,that);
        });
    },


    showPage() {
        let start = this.totalPerPages * this.currentPage;
        for (let i = start; i <= start + this.totalPerPages; i++) {
            this.showPosts(i);

        } this.currentPage++;

    },
    showPosts: function (index) {
        let post= this.posts[index];
        let postDom = document.createElement('article');
        postDom.setAttribute('class', 'blog-post');
        postDom.innerHTML = this.createPostHtml(post);
        this.blogWrapper.appendChild(postDom);
    },


    createPostHtml: function(post) {
    return `<h3 class="title">${post.title}</h3>
        <div class="body">${post.body}</div>
        <div class="info">${post.id}</div>`;
},

    onBlogScroll: function (e, context) {
        const maxScroll = document.documentElement.scrollTopMax;
        const currentScroll = document.documentElement.scrollTop;

        if (maxScroll >= currentScroll) {
            context.showPage();
        };


    },


}

blog.init();