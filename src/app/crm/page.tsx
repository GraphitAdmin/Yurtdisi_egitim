'use client'
import {Input} from "@/components/crm/ui/input";
import {Button} from "@/components/crm/ui/button";
import React, {useEffect, useState} from "react";
import Link from "next/link";

export default function AdminPanel() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === "Emir" && password === "secretpassword") {
            sessionStorage.setItem('isLoggedIn','true')
            window.location.href='/crm/subscribers'
        } else {
            alert("Invalid credentials")
        }
    }
    useEffect(() => {
        const checkLogged=sessionStorage.getItem('isLoggedIn')
        if (checkLogged&&checkLogged==='true'){
            window.location.href='/crm/subscribers'
        }
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <main className="flex-1 p-4">
                    <div className="min-h-screen bg-background flex items-center justify-center flex-col">
                        <div className="p-4">
                            <Link href='/crm'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     style={{height: 28, maxHeight: 28, width: 'auto'}}
                                     viewBox="0 0 788 174" fill="none">
                                    <path
                                        d="M79.0542 173.542C35.5871 173.542 5.08387 154.986 5.08387 106.943C5.08387 65.2555 35.3329 40.3445 78.0374 40.3445C122.267 40.3445 150.483 62.4594 150.483 103.639C150.483 107.96 150.228 111.265 149.72 115.84H49.3135C50.0761 131.346 56.9394 135.667 77.2748 135.667C96.5936 135.667 101.677 132.363 101.677 124.737V121.941H149.466V124.991C149.466 153.461 122.267 173.542 79.0542 173.542ZM77.0206 76.9484C59.4813 76.9484 52.1097 80.7613 50.0761 91.6916H104.219C102.44 80.7613 94.8142 76.9484 77.0206 76.9484ZM230.885 173.542C187.418 173.542 156.915 154.986 156.915 106.943C156.915 65.2555 187.164 40.3445 229.868 40.3445C274.098 40.3445 302.314 62.4594 302.314 103.639C302.314 107.96 302.059 111.265 301.551 115.84H201.145C201.907 131.346 208.77 135.667 229.106 135.667C248.425 135.667 253.508 132.363 253.508 124.737V121.941H301.297V124.991C301.297 153.461 274.098 173.542 230.885 173.542ZM228.852 76.9484C211.312 76.9484 203.941 80.7613 201.907 91.6916H256.05C254.271 80.7613 246.645 76.9484 228.852 76.9484ZM382.716 173.542C339.249 173.542 308.746 154.986 308.746 106.943C308.746 65.2555 338.995 40.3445 381.699 40.3445C425.929 40.3445 454.145 62.4594 454.145 103.639C454.145 107.96 453.89 111.265 453.382 115.84H352.976C353.738 131.346 360.601 135.667 380.937 135.667C400.256 135.667 405.339 132.363 405.339 124.737V121.941H453.128V124.991C453.128 153.461 425.929 173.542 382.716 173.542ZM380.683 76.9484C363.143 76.9484 355.772 80.7613 353.738 91.6916H407.881C406.102 80.7613 398.476 76.9484 380.683 76.9484ZM521.329 173.542C482.183 173.542 460.577 148.377 460.577 106.943C460.577 65.2555 481.675 40.3445 519.296 40.3445C549.545 40.3445 563.779 54.5793 567.592 75.9316H570.134V0.690322H617.923V171H573.185V136.43H570.643C566.576 161.849 551.324 173.542 521.329 173.542ZM508.874 106.943C508.874 123.974 516.499 129.821 538.614 129.821C559.966 129.821 570.134 125.754 570.134 107.197V105.418C570.134 87.3703 559.966 83.8116 538.614 83.8116C516.499 83.8116 508.874 89.9123 508.874 106.943ZM681.965 173.542C646.124 173.542 629.347 152.698 629.347 124.991V42.8865H677.136V107.452C677.136 125.245 683.999 130.837 705.86 130.837C727.975 130.837 733.313 125.499 733.313 108.977V42.8865H781.101V171H736.363V132.108H733.821C731.025 153.461 716.79 173.542 681.965 173.542Z"
                                        fill='#1A1A1A'/>
                                </svg>
                            </Link>
                        </div>
                        <h4 style={{color: '#000'}}>Admin Panel</h4>
                        <form onSubmit={handleLogin} style={{marginTop: 16}}
                              className="space-y-4 w-full max-w-sm flex flex-col items-center justify-center">
                            <Input type="text" placeholder="Username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-48 border-2 border-black">
                                Login
                            </Button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}