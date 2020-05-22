import axios from "axios"
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/n3",
    timeout: 5000
  });
  // 2.axios请求拦截器
  instance.interceptors.request.use(config => {
    console.log(config);
    return config
  }, err => {
    console.log(err);
  });
  //3. 响应拦截
  instance.interceptors.response.use(result => {
    console.log(result);
    return result.data
  }, err => {
    console.log(err);
  });


  // 4.发送真正的网络请求, 用的时候传入两个函数, success和failure
  return instance(config)

}


