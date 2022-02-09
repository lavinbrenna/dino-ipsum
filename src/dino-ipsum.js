export default class DinoIpsum{
  static getNewDino() {
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      const url = 'https://dinoipsum.com/api/?format=json&paragraphs=1&words=1';
      request.onload = function(){
        if(this.status === 200){
          resolve(request.response);
        }else{
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}