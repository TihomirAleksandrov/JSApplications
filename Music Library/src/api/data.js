import {del, get, post, put} from './api.js'

export async function getAll(){
    return get('/data/albums?sortBy=_createdOn%20desc')
}

export async function getById(id){
    return get('/data/albums/' + id);
}

export async function createAlbum(shoesData){
    return post('/data/albums', shoesData);
}

export async function editAlbum(id, shoesData){
    return put('/data/albums/' + id, shoesData);
}

export async function deleteById(id){
    return del('/data/albums/' + id);
}