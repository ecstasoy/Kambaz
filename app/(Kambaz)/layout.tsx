import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {ReactNode} from "react";
import KambazNavigation from "./Navigation";

export default function KambazLayout({
                                         children,
                                     }: Readonly<{ children: ReactNode }>) {
    return (
        <table>
            <tbody>
            <tr>
                <td valign="top" width="200">
                    <KambazNavigation/>
                </td>
                <td valign="top" width="100%">
                    {children}
                </td>
            </tr>
            </tbody>
        </table>
    );
}
