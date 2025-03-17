import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/useSignin";

interface FormData {
    username: string;
    password: string;
}

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });
    const [token, setToken] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { loading, refetch } = useSignIn({
        username: formData.username,
        password: formData.password,
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        refetch({
            username: formData.username,
            password: formData.password,
        })
            .then((response) => {
                setToken(response?.data?.signinUser?.token);
                if (response?.data?.signinUser?.token) {
                    sessionStorage.setItem(
                        "authToken",
                        response.data.signinUser.token,
                    );
                    navigate("/");
                }
                console.log(
                    "Refetch response:",
                    response?.data?.signinUser?.token,
                );
            })
            .catch(() => {
                setErrorMessage("Username or Password Invalid.");
            });
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        })
                                    }
                                    value={formData.username}
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="jondoe"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    value={formData.password}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start"></div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                            {/* Display error message from query or refetch */}
                            {errorMessage && (
                                <p className="text-red-500 text-sm">
                                    {errorMessage}
                                </p>
                            )}
                            {token && (
                                <p className="text-green-500 text-sm">
                                    Sign in successful!
                                </p>
                            )}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to={"/signup"}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
