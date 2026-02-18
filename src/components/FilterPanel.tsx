import { getCategories } from '@/services/api/category'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'

const FilterPanel = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [categories, setCategories] = useState([])
    const [sortPrice, setSortPrice] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories()
                setCategories(response)
            } catch (err) {
                console.log('Error: ', err);
            }
        }

        fetchCategories()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') {
            if (e.target.checked) {
                searchParams.set(name, 'true')
            } else {
                searchParams.delete(name)
            }
        } else if (value) {
            searchParams.set(name, value)
        } else {
            searchParams.delete(name)
        }

        setSearchParams(searchParams)
    }

    const handleReset = () => {
        searchParams.delete('search')
        searchParams.delete('categoryName')
        searchParams.delete('maxPrice')
        searchParams.delete('minPrice')
        searchParams.delete('onlySales')
        searchParams.delete('page')
        searchParams.delete('pageSize')
        setSearchParams(searchParams)
    }

    return (
        <>
            <div className=''>
                
                {/* <Button variant="ghost" size="sm" onClick={handleReset}>გასუფთავება</Button> */}
            </div>

            <form className='px-3 border-t pb-5 md:p-0 md:border-none md:w-[260px] '>
                

                <div className='border-b py-3'>
                    
                    <select
                        name="categoryName"
                        value={searchParams.get('categoryName') || ''}
                        onChange={handleInputChange}
                        className='block w-full text-[11px] md:text-[16px] h-6  font-semibold md:font-medium   outline-none'
                    >
                        <option value="" className=''>All categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div  className='py-3 border-b'>
                    <div onClick={() => setSortPrice(!sortPrice)} className='flex justify-between items-center px-1'>
                        <label className='text-[11px] md:text-[16px] font-semibold md:font-medium'>Price</label>
                        <div className='rotate-90'><svg width="10" height="10" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52875 7C8.52086 6.72379 8.41826 6.48704 8.20519 6.27396L2.06539 0.26832C1.88388 0.0947012 1.6708 0 1.41037 0C0.881624 0 0.471252 0.410372 0.471252 0.939121C0.471252 1.19166 0.573845 1.42841 0.755356 1.60992L6.27959 7L0.755356 12.3901C0.573845 12.5716 0.471252 12.8005 0.471252 13.0609C0.471252 13.5896 0.881624 14 1.41037 14C1.66291 14 1.88388 13.9053 2.06539 13.7317L8.20519 7.71815C8.42616 7.51297 8.52875 7.27621 8.52875 7Z" fill="currentColor"></path></svg></div>
                    </div>

                     {sortPrice ?
                        <div className='mt-3 px-1'>
                            <div className='flex gap-2'>
                                <input
                                    className='outline-none w-full border py-2 pl-2 rounded-sm focus:ring-0 text-[12px] md:text-[14px]'
                                    type="number"
                                    name="minPrice"
                                    placeholder='min.'
                                    value={searchParams.get('minPrice') || ''}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className='outline-none w-full border py-2 pl-2 rounded-sm focus:ring-0 text-[12px] md:text-[14px] '
                                    type="number"
                                    name="maxPrice"
                                    placeholder='max.'
                                    value={searchParams.get('maxPrice') || ''}
                                    onChange={handleInputChange}
                                    />
                            </div>
                        </div>
                        :
                        <></>
                     }       
                    
                </div>

                <div className='flex mt-3 px-1 gap-2  items-center'>
                    <label htmlFor="onlySales" className=' text-[11px] md:text-[16px] md:font-medium font-semibold'>Sales</label>
                    <input
                        type="checkbox"
                        id="onlySales"
                        name="onlySales"
                        checked={searchParams.get('onlySales') === 'true'}
                        onChange={handleInputChange}
                        className='h-3 w-3  border-gray-300 rounded'
                    />
                </div>
            </form>
        </>
    )
}

export default FilterPanel