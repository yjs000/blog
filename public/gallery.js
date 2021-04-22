// //메모 입력시 메모 내용을 얻는 함수
// async function getContent() {
//   try {
//     const res = await axios.get('/contents');
//     const contents = res.data;
//     console.log(contents);
//     const list = document.getElementById('list');
//     list.innerHTML = '';

//     console.log(list);
//     Object.keys(contents).map(function (key) {
//       div = document.createElement('div');
//       div.setAttribute("class", "content");

//       h1 = document.createElement('h1');
//       h1.innerHTML = `${contents[key].title}`;
      
//       p = document.createElement('p');
//       p.innerHTML = `${contents[key].text}`;

//       buttonDiv = document.createElement('div');
//       buttonDiv.setAttribute("class", "buttonDiv");

//       // 수정 버튼 생성
//       const edit =document.createElement('button');
//       edit.textContent = "수정";
//       edit.setAttribute = ("class", "editButton");
//       edit.addEventListener('click' , async() => {
//         //window.location = './addForm.html?type=edit'
//         const title = prompt("수정할 제목을 입력하세요");
//         const text = prompt("수정할 글을 입력하세요");
//         if( !title || !text){
//           alert("제목과 글을 반드시 입력하셔야 합니다.");
//         }
//         try{
//           await axios.put('/content/'+key, {title, text});
//           getContent();
//         }catch(err){
//           console.log(err);
//         }
//       });

//       // 삭제 버튼 생성
//       const remove = document.createElement('button');
//       remove.textContent = "삭제";
//       remove.setAttribute = ("class", "removeButton");
//       remove.addEventListener('click', async () => {
//         try{
//           await axios.delete('/content/'+key);
//           getContent();
//         } catch(err) {
//           console.log(err);
//         }
//       });


//       // 연결
//       list.append(div);
//       div.append(h1, p, buttonDiv);
//       buttonDiv.append(edit, remove);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }


// window.onload = getContent(); // 화면 로딩 시 getUser 호출