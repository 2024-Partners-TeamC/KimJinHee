import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useState, useEffect } from "react";

const router = createBrowserRouter([ //배열을 routes에 전달
  {
    path: "/", // (슬래시)모든 경로와 맞아떨어짐
    element: <Layout />, // layout은 로그인한 사용자만 사용할 수 있도록 함
    children: [ // route를 넣을 또 다른 배열
      {// 이 둘은 layout component 내부에서 render되고 있음
        path: "", // 경로에 아무것도 없을 때
        element: <Home />,
      },
      {
        path: "profile", // http://localhost:5173/profile 
        element: <Profile />,
      },
    ]
  },
  { // login이랑 create-account가 layout안에 들어가지 않도록 children 밖에서 작성
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color:white;
    font-family: system-ui;
  }
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    //wait for firebase
    //setTimeout(() => setLoading(false), 2000); // 준비가 되면 false로 바꿔줌
    setLoading(false);
  }
  useEffect(() => {
    init();
  }, []);
  return <>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </>;
}

export default App;
