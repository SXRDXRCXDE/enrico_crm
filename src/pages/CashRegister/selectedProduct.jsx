import React, {useState} from "react";
import style from "./style.module.css";
import QuantityCounter from "./QuantityCounter";


export default function SelectedProduct({id,name,price}) {


    const limitCharacters = (text, charLimit = 20) => {
        if (text.length <= charLimit) return text;

        let trimmedText = text.slice(0, charLimit).trim(); // Trim extra space at the end
        return trimmedText + "...";
    };


    return(
        <>
            <div className={'w-full h-24 border flex items-start p-3'}>

                {/*Product picture & title*/}
                <div className={'w-1/2 h-full flex gap-3 overflow-hidden '}>
                    <div className={'w-[64px] h-full'}>
                        <div className={'w-[64px] h-full'}>
                            <img className={'w-[64px] h-full object-cover shadow-xl rounded-xl '} alt={''} src={'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-5462_alternate10?$plpDeskRF$'}/>
                        </div>
                    </div>

                    <span className={'mt-3 text-start font-semibold text-black/70 line-clamp-2'}>
                        {limitCharacters('Name of sadsadsad sadsad ')}
                    </span>
                </div>


                <div className={'w-1/2 h-full flex items-center justify-between gap-3 overflow-hidden'}>

                    <QuantityCounter/>

                    <div className={'h-full flex flex-col items-end text-end'}>

                        <span className={'font-semibold text-xs mt-2'}>Narxi</span>

                        <span className={'text-[14px] font-semibold whitespace-nowrap'}>{limitCharacters((54446483 ?? 0).toLocaleString())}</span>
                        <span className={'text-[14px]'}>so'm</span>

                    </div>



                </div>

            </div>
        </>
    )

}