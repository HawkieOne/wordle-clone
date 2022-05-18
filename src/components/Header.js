import React from 'react'
import { MenuIcon, QuestionMarkCircleIcon, ChartBarIcon, CogIcon } from '@heroicons/react/solid'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-2 text-white">
        <div className="flex"> 
            <MenuIcon className="w-8 h-8 cursor-pointer"/>
            <QuestionMarkCircleIcon className="w-8 h-8 cursor-pointer"/>
        </div>
        <h1 className="text-3xl font-bold">Wordle</h1>
        <div className="flex">
            <ChartBarIcon className="w-8 h-8 cursor-pointer"/>
            <CogIcon className="w-8 h-8 cursor-pointer"/>
        </div>
    </div>
  )
}
