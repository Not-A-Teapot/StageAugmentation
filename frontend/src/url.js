let url = ''
if(process.env.NODE_ENV === 'production'){
  url = 'https://192.168.0.155:8001';
}else{
  url = process.env.REACT_APP_NODE_URL;
}
module.exports = url;
