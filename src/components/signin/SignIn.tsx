import React, { useState } from "react";
import Logo from '@/public/assets/cusisnappedLogo.jpeg';
import { useForm, SubmitHandler } from "react-hook-form";
import { UserDTO } from "@/pages/api/users";
import { InlineAlert } from "./InlineAlert";

export interface SignInProps {
    onSubmit: (data: Partial<UserDTO>) => void;
}

const SignIn = ({ 
    onSubmit,
}: SignInProps) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [hiddenAlerts, setHiddenAlerts] = useState<{[key: string]: boolean}>({});
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserDTO>()

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-white border-solid rounded-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src={Logo.src} alt="CusISnapped Logo" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">Submit your email</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(submitUser)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">Email address</label>
                        <div className="mt-2">
                            <input
                                className="
                                    block w-full rounded-md border-0 px-2 py-1.5 
                                    text-black shadow-sm ring-1 ring-inset ring-stone-900 
                                    placeholder:text-stone-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6
                                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500
                                "
                                {...register('email', { required: true, maxLength: 100, pattern: new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$") })}
                                onBlur={() => setHiddenAlerts({ ...hiddenAlerts, email: false })}
                            />

                            {/* use role="alert" to announce the error message */}
                            {errors.email && errors.email.type === "required" && !hiddenAlerts.email && (
                                <InlineAlert message="This is a required field!" onClick={() => setHiddenAlerts({...hiddenAlerts, email: true })} />
                            )}
                            {errors.email && errors.email.type === "maxLength" && !hiddenAlerts.email && (
                                <InlineAlert message="Email is too long!" onClick={() => setHiddenAlerts({...hiddenAlerts, email: true })} />
                            )}
                        </div>
                    </div>

                    { isAdmin &&
                        <div>
                            <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-stone-100">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    autoComplete="current-password"
                                    {...register('password', { required: true })}
                                />
                            </div>
                        </div>
                    }
                    <div>
                        <button
                            disabled={Object.keys(errors).length > 0}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            { isAdmin ? 'Sign in' : 'Submit'}
                        </button>
                    </div>
                </form>

                {/* <p className="mt-10 text-center text-sm text-stone-500">
                Not a member?
                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Go to admin portal.</a>
                </p> */}
            </div>
        </div>
    )

    function submitUser(data: Partial<UserDTO>) {
        onSubmit(data);
    }
}

export { SignIn };