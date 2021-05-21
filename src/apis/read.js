import service from '../utils/request.js'

export function Gettables(){
    return service.request({
        method: "get",
        url: "/signal_tables"
    })
}

export function Getheadres(){
    return service.request({
        method: "get",
        url: "/headers"
    })
}

export function ShowPost(postParams){
    return service.request({
        method:'post',
        url:"/show/"+ postParams.params.table_name,
       
    })
}
export function Download(postParams){
    return service.request({
        method:'post',
        url:"/download/"+ postParams.params.table_name,
       
    })
}
export function submit(postParams){
    return service.request({
        method:'post',
        url: '/start_ad', 
        data:postParams
       
    })
}
