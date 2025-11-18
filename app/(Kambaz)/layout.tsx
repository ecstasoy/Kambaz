"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {ReactNode} from "react";
import KambazNavigation from "./Navigation";
import Session from "./Account/Session";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({
                                         children,
                                     }: Readonly<{ children: ReactNode }>) {
    return (
        <Provider store={store}>
            <Session>
                <div className="d-flex" id="wd-kambaz">
                    <div>
                        <KambazNavigation />
                    </div>
                    <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
                </div>
            </Session>
        </Provider>
    );
}
