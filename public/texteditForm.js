
  // 폼 제출(submit) 시 실행
document.getElementById('texteditForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // const res = await axios.get('/contents')
  // const contents = res.data;

  // const title = e.target.title.value;
  // const text = e.target.text.value;

  // if (!title || !text) {
  //   return alert('제목과 글을 입력하세요');
  // }

  // Object.keys(contents).map(function (key){

  // });

  //texteditForm.js에서 글 수정
  //textwriteForm에서 글 업로드

  ////////////여기해야해
  await axios.post('/content/'+key, { title, text })
    .then(
      (res) => {
        window.location = "/";
      })
    .catch((err) => {
      console.log(err);
    })
  //입력 form초기화
  e.target.title.value = '';
  e.target.text.value = '';
});

