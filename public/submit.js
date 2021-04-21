

// async function getContent() { // 로딩 시 사용자 가져오는 함수
//   try {
//     const res = await axios.get('/contents');
//     const contents = res.data;
//     const list = document.getElementById('list');
//     list.append
//     // content마다 반복적으로 화면 표시 및 이벤트 연결
//     Object.keys(contents).map(function (key) {
//       //1. content 영역 & 이름 DOM객체 생성
//       const contentDiv = document.createElement('div');
//       const h1 = document.createElement('h1');
//       const p = document.createElement('p');
//       h1.textContent = contents[key].title
//       p.textContent = contents[key].text;

//       // // 사용자 수정버튼 생성
//       // const edit = document.createElement('button');
//       // edit.textContent = '수정';
//       // edit.addEventListener('click', async () => { // 수정 버튼 클릭 리스너
//       //   const name = prompt('수정할 이름을 입력하세요');
//       //   const memo = prompt('수정할 메모를 입력하세요')
//       //   if (!name || !memo) { // name 이나 memo에 값이 없으면 alert
//       //     return alert('이름과 메모를 반드시 입력하셔야 합니다');
//       //   }
//       //   //name, memo에 값이 잘 들어오면
//       //   try { // 서버에 사용자 수정 요청 & getUser()실행
//       //     await axios.put('/user/' + key, { name, memo });
//       //     getUser();
//       //   } catch (err) {
//       //     console.error(err);
//       //   }
//       // });
//       // // 사용자 삭제버튼 생성
//       // const remove = document.createElement('button');
//       // remove.textContent = '삭제';
//       // remove.addEventListener('click', async () => { // 삭제 버튼 클릭
//       //   try { //서버에 사용자 삭제요청 & getUser()실행
//       //     await axios.delete('/user/' + key);
//       //     getUser();
//       //   } catch (err) {
//       //     console.error(err);
//       //   }
//       // });
//       //생성한 사용자 이름/수정/삭제버튼을 DOM에 연결 & 브라우저에 출력
//       contentDiv.appendChild(h1);
//       contentDiv.appendChild(p)
//       // userDiv.appendChild(edit);
//       // userDiv.appendChild(remove);
//       list.appendChild(contentDiv);
//       // console.log(res.data);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }





  // 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const text = e.target.text.value;
  if (!title || !text) {
    return alert('제목과 글을 입력하세요');
  }
  await axios.post('/content', { title, text })
    .then(
      (res) => {
        window.location.href = "/index.html";
      })
    .catch((err) => {
      console.log(err);
    })
  //입력 form초기화
  e.target.title.value = '';
  e.target.text.value = '';
});

