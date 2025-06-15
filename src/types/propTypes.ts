import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant : "primary" | 'secondary' | 'ternary',
    children : React.ReactNode
}