//메모 입력시 메모 내용을 얻는 함수
async function getContent() {
  try {
    const res = await axios.get('/contents');
    const contents = res.data;
    console.log(contents); //////////////////////////여기까지 나오는거 확인
    // id가 list인것 안에
    // 메모마다 반복적으로 화면에 표시
    const list = document.getElementById('list');
    Object.keys(contents).map(function (key) {
      var template = `
      <div>
        <h1>${contents[key].title}</h1>
        <p>${contents[key].text}</p>
      </div>
    `
      list.appendChild(template);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getContent(); // 화면 로딩 시 getUser 호출