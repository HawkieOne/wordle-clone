import React from 'react'
import { MenuIcon, QuestionMarkCircleIcon, ChartBarIcon, CogIcon } from '@heroicons/react/solid'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-2 text-white">
        <div className="flex"> 
            <MenuIcon className="w-10 h-10 cursor-pointer"/>
            <QuestionMarkCircleIcon className="w810 h-10 cursor-pointer"/>
        </div>
        <h1 className="text-3xl font-bold">Wordle</h1>
        <div className="flex">
            <ChartBarIcon className="w-10 h-10 cursor-pointer"/>
            <CogIcon className="w-10 h-10 cursor-pointer"/>
        </div>
    </div>
  )
}
