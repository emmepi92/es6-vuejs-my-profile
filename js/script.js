const data = {
    myProfile: {
        details: {
            name: 'Pierfilippo',
            surname: 'Baudo',
            pic: 'https://www.focus.it/site_stored/imgs/0003/042/nerd2.1020x680.jpg',
        },
        posts: [
            {
                text: "C'è nessuno?",
                mediaPath: 'https://acqualete.it/wp-content/uploads/2015/09/La-Particella-di-Sodio-1.jpg',
                date: '26-05-2021'
            }, {
                text: "Vi ricordate di Windows XP? Che ricordi, non ce la faccio...",
                mediaPath: 'https://upload.wikimedia.org/wikipedia/it/d/d3/Colline_%28immagine%29.jpg',
                date: '01-06-2021'
            }, {
                text: "Mi sono iscritto in palestra!",
                date: '16-06-2021'
            },
            {
                text: 'Vi presento il mio amico Mimmo',
                mediaPath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Supernerd_%283262512306%29.jpg/1024px-Supernerd_%283262512306%29.jpg',
                date: '17-06-2021'
            }
        ]
    }
};

const userDetailHtml = document.querySelector(".user-details")

userDetailHtml.innerHTML = `
    <div class="user-pic"><img src="${data.myProfile.details.pic}" alt="user pic"></div>
    <div class="user-name">${data.myProfile.details.name} ${data.myProfile.details.surname} </div>
`

// in vuejs sarà: {{ myProfile.details.name }}

const postListHtml = document.querySelector(".post-list")

data.myProfile.posts.forEach((post) => {

    // prepariamo la parte interna dell'elemento html .post
    let postHtml = `
    <div class="post-details"> 
        <div class="user-pic">
            <img src="${data.myProfile.details.pic}" alt="user pic">
        </div>
        <div class="details">
            <div class="user-name">${data.myProfile.details.name} ${data.myProfile.details.surname}</div>
            <div class="post-date">${post.date}</div>            
        </div>
        <i class="fas fa-times"></i>
    </div> 
    <div class="post-text">
        ${post.text}
    </div>
    ` 
    // solo se l'immagine esiste aggiungere a postHtml l'html del media
    // mediaPath è una chiave che "a volte" esiste. <= verifichiamo che esista.
    // usiamo Object.keys(post) per ottenere tutte le chiavi di un oggetto => è una lista/array
    if (Object.keys(post).includes('mediaPath')) {
        postHtml += ` <div class="post-media">
        <img src="${post.mediaPath}" alt="media" />
        </div>`
    }

    // adesso il nostro html preparato è il postHtml.
    // dobbiamo inserirlo nel suo container <div class="post"></div>
    // e il tutto dentro postListHtml.innerHtml.



    postListHtml.innerHTML += `<div class="post"> ${postHtml} </div>`
}) 


const buttonInput = document.querySelector("button.send");
console.log(data.myProfile.posts.length)


buttonInput.addEventListener("click", function() {

    let datatime = dayjs();

    //prendo l'elemento html dell'input
    const textInput = document.querySelector("textarea");

    //prendo il valore dell'input
    let newObj = textInput.value
    console.log(newObj)

    //pusho nell'array
    data.myProfile.posts.push({text:newObj, date:datatime.format("DD/MM/YY")});
    console.log(data.myProfile.posts.length,data.myProfile.posts[data.myProfile.posts.length - 1] );
    textInput.value = '';

    let newPost = `
    <div class="post-details"> 
        <div class="user-pic">
            <img src="${data.myProfile.details.pic}" alt="user pic">
        </div>
        <div class="details">
            <div class="user-name">${data.myProfile.details.name} ${data.myProfile.details.surname}</div>
            <div class="post-date">${datatime.format("DD/MM/YY")}</div>
        </div>
    </div> 
    <div class="post-text">
        ${newObj}
    </div>
    ` 
    postListHtml.innerHTML += `<div class="post"> ${newPost} </div>`

})

