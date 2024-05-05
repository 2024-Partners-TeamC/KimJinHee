import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <h2>layout</h2>
            <Outlet />
        </>
    );
}

// 경로가 /profile로 가면 <Outlet /> => <Profile />로 바뀜