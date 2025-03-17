import { useContext } from "react";
import { UserContext, UserType } from "../context/UserContext";

const Home = () => {
    const { user, loading } = useContext(UserContext) as {
        user: UserType;
        loading: boolean;
    };
    if (loading) return <h1>Loading...</h1>;
    return (
        <div className="w-full min-h-screen bg-slate-200">
            welcome back! {user?.name}
            <div className="w-full h-full ">
                <br />
                Todos:
                {user?.todos?.map((item) => (
                    <div key={item.id} className="flex gap-3">
                        <h1>{item.title}</h1>
                        <h1>{item.description}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
