// admit을 확인해서 true인경우 실행됨
// admit이 true인경우 content에 수정, 삭제버튼을 달아줌

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

      

      // 수정 버튼 생성
      const edit =document.createElement('button');
      edit.textContent = "수정";
      edit.setAttribute("class", "editButton");
      edit.addEventListener('click' , async() => {
        axios.post(`/user/currentkey/${key}`);
        window.location = '/user/textForm?type=edit'       
      });

      // 삭제 버튼 생성
      const remove = document.createElement('button');
      remove.textContent = "삭제";
      remove.setAttribute = ("class", "removeButton");
      remove.addEventListener('click', async () => {
        try{
          await axios.delete('/user/content/'+key);
          getContent();
        } catch(err) {
          console.log(err);
        }
      });


      // 연결
      list.append(div);
      div.append(divTitle, divP, divButton);
      divTitle.append(h1);
      divP.append(p);
      divButton.append(edit, remove);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getContent(); // 화면 로딩 시 getUser 호출
