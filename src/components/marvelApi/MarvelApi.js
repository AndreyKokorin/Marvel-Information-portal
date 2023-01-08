class RequestMarvelApi{
    transformData =  (data) => {
        return data.map(item => ({
            id: item.id,
            name: item.name, 
            description: item.description,
            img:`${item.thumbnail.path}.${item.thumbnail.extension}` ,
            comics: item.comics.items,
            homepage: item.urls[0].url,
            wiki: item.urls[1].url
           }))  
        
        }

        getCharecters =  async (limit) => {
        return await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=${limit}&apikey=576fd6b13c6d6f94f665746f60462de5`)
        }

        getCharecter = async (id) => {
           return  await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=576fd6b13c6d6f94f665746f60462de5`)
        }

        getRandomCharId = () => {
            return Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        }

}
export default RequestMarvelApi