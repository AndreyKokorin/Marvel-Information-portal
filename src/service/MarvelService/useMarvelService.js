import {useHttp} from "../../hooks/useHttp/useHttp"

export const  useMarvelService = () =>{
    const _Api_Base = `https://gateway.marvel.com:443/v1/public`;
    const _Api_Key = `apikey=576fd6b13c6d6f94f665746f60462de5`;

    const  {error, loading, request} = useHttp();
    
    const validateDescr = (descr) =>{
        return (descr.length > 150) ? descr.slice(0, 56) + "...": descr
    }

    const transformData =  (data) => {
        return data.map(item => ({
            id: item.id,
            name: item.name, 
            description: validateDescr(item.description),
            img:`${item.thumbnail.path}.${item.thumbnail.extension}` ,
            comics: item.comics.items,
            homepage: item.urls[0].url,
            wiki: item.urls[1].url
           }))  
        
        }

    const getCharecters = async(offset) => {
        const res = await  request(`${_Api_Base}/characters?limit=6&offset=${offset}&${_Api_Key}`);
        return transformData(res.data.results)
    }
    
    const getCharecter = async (id) =>{
        const res = await  request(`${_Api_Base}/characters/${id}?${_Api_Key}`);
        return transformData(res.data.results)    
    }

    const transformComics = (data) => {
        return data.map(comics => ({
            id: comics.id,
            title: comics.title,
            url: comics.urls[0].url,
            img: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price: comics.prices[0].price + "$"
        }))
    }

    const getComics = async (offset) => {
        const res = await request(`${_Api_Base}/comics?limit=8&offset=${offset}&${_Api_Key}`)

        return transformComics(res.data.results)
    }

    return {getCharecters, getCharecter, error, loading, getComics}
}

