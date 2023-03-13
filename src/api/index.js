import axios from 'axios'
 
axios.defaults.baseURL = 'http://localhost:8008'
 
export const addUser = (data) => axios.post('/newUser',data).then(res => res.data.data)
 
export const getList = (data) => axios.get('/newUser',{params:data}).then(res => res.data.data)
 
export const delUser = (data) => axios.delete(`/newUser/${data.id}`).then(res => res.data.data)
 
export const updateUser = (data) => axios.patch(`/newUser/${data.id}`,data).then(res => res.data.data)

export const addTags = (data) => axios.post('/newUser/add/tags',data).then(res => res.data.data)