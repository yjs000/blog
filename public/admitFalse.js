

//메모 입력시 메모 내용을 얻는 함수
async function getContent() {
  try {
    const res = await axios.get('/user/contents');
    const contents = res.data;
    console.log(contents);
    const list = document.getElementById('list');
    list.innerHTML = '';

    console.log(list);
    Object.keys(contents).map(function (key) {
      div = document.createElement('div');
      div.setAttribute("class", "content");

      divTitle = document.createElement('div');
      divTitle.setAttribute("class", "content-title")

      divP = document.createElement('div');
      divP.setAttribute("class", "content-p")

      divButton = document.createElement('div');
      divButton.setAttribute("class", "content-bottom");

      h1 = document.createElement('h1');
      h1.innerHTML = `${contents[key].title}`;
    
      p = document.createElement('p');
      p.innerHTML = `${contents[key].text}`;

      // 연결
      list.append(div);
      div.append(divTitle, divP, divButton);
      divTitle.append(h1);
      divP.append(p);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getContent(); // 화면 로딩 시 getUser 호출
