import {CloseOutlined} from '@ant-design/icons';



const ChipTagCustom=({camera,onClosePressed})=>{
    return <div className="flex items-center p-1 m-1 border-2 rounded-lg bg-slate-200 text-c1 dark:bg-slate-800 dark:text-c4 dark:border-slate-500">
        <p className='px-1'>{camera}</p>
        <button onClick={onClosePressed}><CloseOutlined className='text-sm'/></button>
    </div>

}





export default ChipTagCustom