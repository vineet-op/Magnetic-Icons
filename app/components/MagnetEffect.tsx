"use client"

import React, { useRef, useState } from 'react'
import { motion } from "motion/react"


export const MagnetEffect = ({ children }: { children: React.ReactNode }) => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect()
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y })
    }

    const onMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 10, mass: 0.1 }}
            className='w-10  flex items-center lg:w-full'
            ref={ref}
        >
            {children}
        </motion.div>
    )
}
