import { Filter, Search } from "lucide-react"
import { useState } from "react"
import type { SearchBarProps } from "../../types/propTypes"

export default function SearchBar ({searchValue, setSearchValue, setFilterValue} : SearchBarProps) {

    return (
        <div className="bg-white py-5 px-5 mx-50 my-10 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-4/5">
                    <Search className="absolute text-gray-500 left-0 top-3 h-4 w-4 ml-2" />
                    <input 
                        className="flex-grow h-4 w-full border border-gray-300 rounded-md p-5 pl-10" 
                        type="text"
                        placeholder="Search by title, author, genre"
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                    />
                </div>

                <div className="flex relative w-1/5">
                    <Filter className="absolute text-gray-900 h-4 w-4 top-3 left-1 mr-2" />
                    <select 
                        className="flex flex-grow h-10 w-full border border-gray-300 rounded-md px-5"
                        onChange={(e)=> setFilterValue(e.target.value)}
                    >
                        <option defaultChecked value='All'> All Genres</option>
                        <option value='Programming'>Programming</option>
                        <option value='Horror'>Horror</option>
                    </select>
                </div>
            </div>
        </div>
    )
}