const fs = require('fs');

const postService = {};

postService.update = async (id, params) => {
  return await new Promise((res, rej) => {
    fs.writeFile(`./post-data-${id}`, JSON.stringify(params), { encoding: 'utf-8' }, (e) => {
      if (e) return rej(e);
      return res();
    });
  });  
}


module.exports = postService;