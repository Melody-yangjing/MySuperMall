import {request} from "serve/request";

export function getMultiData() {
  return request({
    url:'/home/multidata'
  })
}

export function getGoodsList(type,page) {

  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
