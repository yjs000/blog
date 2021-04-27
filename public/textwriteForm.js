
  // 폼 제출(submit) 시 실행
document.getElementById('textwriteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const text = e.target.text.value;
  if (!title || !text) { //title이나 text에 아무것도 안적힌경우
    return alert('제목과 글을 입력하세요');
  }
  await axios.post('/user/content', { title, text })
    .then(
      (res) => {
        window.location = "/user";
      })
    .catch((err) => {
      console.log(err);
    })
  //입력 form초기화
  e.target.title.value = '';
  e.target.text.value = '';
});

