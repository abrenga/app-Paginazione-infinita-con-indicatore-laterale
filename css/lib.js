const blog = {
    currentPage: 0,
    itemsPerPage : 5,
    totalPage : 0,
    blogWrapper : document.getElementById('blog-w'),
    pagePositionWrapper : document.getElementById('page-position-w')
};

async function initBlog(){
    let postData = await fetch('https://jsonplaceholder.typicode.com/POSTS');
    blog.posts = await postData.json();
    blog.posts.slice(25,75);
    showPosts();
}

initBlog();

function showPosts(){
    let start = blog.currentPage * blog.itemsPerPage;
    for(var i= start; i < start + blog.itemsPerPage; i++){
        let Dom_post = document.createElement('article');
        Dom_post.settAttribute('class', 'blog-post');
        Dom_post.innerHTML = ceratePostHTML(blog.posts[i]);

    }
}

function ceratePostHTML({id, title, body}){
    return 

}