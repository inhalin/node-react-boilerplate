# node-react-boilerplate

### 👶 John Ahn 님의 [노드 리액트 기초 강의](https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T) 따라코딩

### git & github 시작하기

```ps
echo "# node-react-boilerplate" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/inhalin/node-react-boilerplate.git
git push -u origin main
```

#### `.gitignore` 파일에 추가할 것들

- node_modules
- package-lock.json
- dev.js

#### `.gitignore`가 적용되지 않을 때 해결법

```ps
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

#### 비밀 설정 정보 관리

`index.js`에서 MongoDB 연결을 위해 URI를 그대로 넣어주면 아이디와 비밀번호가 노출되기 때문에 보안상 심각한 문제가 있다. 

설정 정보 파일을 만들어줄 `config` 폴더를 생성하고 [`key.js`](./config/key.js)에서 환경변수에 따라 가져올 파일을 설정해준다.

로컬 환경에서는 `dev.js`에서 정보를 가져오고, 프로덕션 환경에서는 `prod.js`에서 정보를 가져와서 DB에 연결해준다.

`dev.js`는 깃허브에서 공유하면 안되는 파일이므로 `.gitignore`에 추가해준다.

---

### node modules

- express: node.js framework
- mongoose: MongoDB 사용 편의를 위한 모듈
- nodemon: 소스가 변경되면 자동으로 감지해서 서버를 재가동해줌 

#### nodemon 사용하기

개발환경에서만 사용하도록 설치하기
```ps
npm install nodemon --save-dev
``` 

서버를 실행할 때 nodemon을 사용하기 위해 `package.json`에 script 추가
```
"scripts": {
   ...
    "dev": "nodemon index.js",
    ...
  },
```

nodemon으로 서버 실행하기
```ps
npm run dev
```