let dataa

const loader = `
<div class="loader-wrapper">
    <div class="loader"></div>
</div>
`

const createData = (data) => {
    let list = ""
    data.forEach(val => {
        list += `
        <li class="chat" onclick="showAnime(${val.mal_id})">
            <figure class="avatar">
                <img src="${val.images.jpg.small_image_url}" alt="">
            </figure>
            <div class="wrapper">
                <h2 class="name">${val.title}</h2>
                <p class="message">${val.score}</p>
            </div>
        </li>
        `
    });
    document.getElementById("chats").innerHTML = list
}

const getExternalData = (val) => {
    return val.map((val) => `<li><a href="${val.url}">${val.name}</a></li>`).join("")
}

const showAnime = (id) => {
    document.getElementById("dialog-box").innerHTML = loader
    fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
    .then((response) => response.json())
    .then((data) => {
        const val = data.data
        document.getElementById("dialog-box").innerHTML = `
        <article class="start">
            <figure class="logo">
                <img src="${val.images.jpg.small_image_url}" alt="">
            </figure>
            <h2>${val.title}</h2>
            <h4>${val.title_japanese}</h4>
            <ul>
                <li>nota: ${val.score}</li>
                <li>numero de episodios: ${val.episodes}</li>
                <li>duracion por capitulo: ${val.duration}</li>
                <li>status: ${val.status}</li>
                <h4>Mas informacion</h4>
                ${getExternalData(val.external)}
            </ul>
        </article>`
    })
}

fetch('https://api.jikan.moe/v4/top/anime?limit=15')
  .then((response) => response.json())
  .then((data) => dataa = data.data)
  .finally(() => createData(dataa))