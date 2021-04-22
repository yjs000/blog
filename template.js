module.exports = {
  HTML:function(css, title, contents){
    return `
    <!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href=${css}>
  </head>
  
  <body>
  
    <header>My blog
      <ul id="nav">
        <li><a href="diary">일기장</a></li>
        <li><a href="gallery">사진첩</a></li>
      </ul>
    </header>
  
    <a href="./addForm.html">
      <div id="addbtn"><p>+</p></div>
    </a>
    
      <div id='list'>${contents}</div>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src='front.js'></script>
    `;
  }
}
