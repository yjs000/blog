  
  // 폼 제출(submit) 시 실행
  document.getElementById('texteditForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await axios.get('/user/currentkey');
    const key = res.data;

    const title = e.target.title.value;
    const text = e.target.text.value;
    if (!title || !text) {
      return alert('제목과 글을 입력하세요');
    }
    await axios.put('/user/content/' + key, { title, text })
    window.location = '/user';
    
    //입력 form초기화
    e.target.title.value = '';
    e.target.text.value = '';
  });