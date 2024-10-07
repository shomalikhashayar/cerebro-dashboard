import React, { useState } from 'react';
import { Button, Popover, Radio, Space, Input } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useStateHeaderContext } from "../../contexts/ContextProviderHeader";
import { useStateContext } from '../../contexts/ContextProvider'
import { TemplateTexts, textHere, TTButtons, TTForms } from '../../utils/intl';
import { dateRegex, logSomething } from '../../utils/utils';
import HandfulDatePicker from '../HandfulDatePicker';
import ChipTagCustom from '../ChipTagCustom';



const FiltteringPopover = () => {


    const { lang } = useStateContext()
    const filteringOptionsModel = [
        {
            index: 1,
            label: textHere(TemplateTexts.options_none, lang),
            value: 'none'
        },
        {
            index: 2,
            label: textHere(TemplateTexts.options_date, lang),
            value: 'date'
        }
    ]
    const { filterSettings, setFilterSettings } = useStateHeaderContext()

    const [filterOpen, setFilterOpen] = useState(false);
    const [filterIndex, setFilterIndex] = useState(1)
 

    function handleChangeRadio(index) {
        setFilterIndex(index)
    }

    let startDateValue = null
    let finishDateValue = null

    function handleClickSet() {
        let newFilteringSettings = {
            ...filterSettings,
            start_date: startDateValue,
            finish_date: finishDateValue,
         }
        setFilterSettings(newFilteringSettings)

    }

    const onStartDateChange = (date,isValid) => {
        startDateValue = isValid?date:null
    };

    const onFinishDateChange = (date,isValid) => {
        finishDateValue = isValid?date:null
    }

    

    return <Popover
        className='px-3'
        overlayStyle={{
            width: "30vw",
        }}
        open={filterOpen}
        onOpenChange={(e) => {
            setFilterOpen(e)
        }}
        content={
            <div className='flex flex-col'>
                <p className='font-semibold'>{`${textHere(TTForms.title_filter_by, lang)}:`}</p>
                <div className='flex justify-around p-5'>
                    <Radio.Group
                        onChange={(e) => {
                            handleChangeRadio(e.target.value)
                        }} value={filterIndex}>
                        <Space direction="vertical">
                            {filteringOptionsModel.map((item, index) =>
                                <Radio value={item.index} key={index}>{item.label}</Radio>
                            )}
                        </Space>
                    </Radio.Group>

                    <div>
                        <Space className='flex gap-3 my-1'>
                            <p className='font-semibold'>{textHere(TemplateTexts.options_from_date, lang)}</p>
                            <HandfulDatePicker onTrigger={onStartDateChange}  />
                        </Space>
                        <Space className='flex gap-3 my-1'>
                            <p className='font-semibold'>{textHere(TemplateTexts.options_to_date, lang)}</p>
                                <HandfulDatePicker onTrigger={onFinishDateChange}   />
                        </Space>
                    </div>
                </div>
                <Space>
 
                     </Space>
                <Button onClick={handleClickSet}>{textHere(TTButtons.action_settings, lang)}</Button>
            </div>
        }
    >
        <button>
            <div>
                <div className='flex items-center'>
                    <FilterOutlined className='text-2xl' />
                </div>
            </div>
        </button>
    </Popover>;
};

export default FiltteringPopover;
