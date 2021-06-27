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

#### `.gitignore`가 적용되지 않을 때 해결법

```ps
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

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