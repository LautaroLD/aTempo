import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaAngleDown, FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation } from 'react-router-dom';

type Props = {
    isLogin: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserDropMenu({ isLogin, setIsLogin }: Props) {
    const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);
    const { pathname } = useLocation()

    useEffect(() => {
        setIsOpenUserMenu(false)
    }, [pathname])
    const openUserMenuFunction = (): void => {
        setIsOpenUserMenu(!isOpenUserMenu);
    };
    const isLoginFunction = (): void => {
        setIsLogin(!isLogin);
    };

    return (
        <span className="header__containerIcons__user">
            {isLogin ? (
                <>
                    <div className="userDropBtn" onClick={openUserMenuFunction}>
                        <FaUser />
                        jhon
                        {isOpenUserMenu ? <BiChevronUp /> : <BiChevronDown />}

                    </div>
                    <div className="userDropMenu" hidden={!isOpenUserMenu} >
                        <Link to={"./"} className="userDropMenu__btn__primary">Mis compras</Link>
                        <Link to={"./"} className="userDropMenu__btn">Mis valoraciones</Link>
                        <Link to={"/profile"} className="userDropMenu__btn">Mi cuenta</Link>
                        <Link to={"./"} className="userDropMenu__btn" onClick={isLoginFunction}>Salir</Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="userDropBtn" onClick={openUserMenuFunction}>
                        Mi cuenta
                        <FaAngleDown />
                    </div>
                    <div className="userDropMenu" hidden={!isOpenUserMenu} >
                        <Link to={"./login"} className="userDropMenu__btn__primary" onClick={isLoginFunction} >Ingresar</Link>
                        <p className="userDropMenu__divider">o</p>
                        <Link to={"./login"} className="userDropMenu__btn google"> <FcGoogle /> Continuar con Google</Link>
                        <Link to={"/signup"} className="userDropMenu__btn">Regístrarse</Link>
                    </div>
                </>
            )}
        </span>
    )
}