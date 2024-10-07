import React, { useState } from 'react';
import { Button, Popover, Radio, Space } from "antd";
import { OrderedListOutlined } from "@ant-design/icons";
import { useStateHeaderContext } from "../../contexts/ContextProviderHeader";
import {useStateContext} from '../../contexts/ContextProvider'
import { TemplateTexts, textHere, TTButtons, TTForms } from '../../utils/intl';




// part: anomaly, face, plate, report
const SortingPopover = ({ part }) => {

    const {lang} = useStateContext()

    const sortingOptionsModel = [
        {
            index: 1,
            label: textHere(TemplateTexts.options_none,lang),
            value: 'none'
        },
        {
            index: 2,
            label: textHere(TemplateTexts.options_date,lang),
            value: 'date'
        },
        {
            index: 3,
            label: textHere(TemplateTexts.options_event_type,lang),
            value: 'event_type'
        },
    ]
    
    
    function getCurrentIndexFromState(part, sortSettings) {
        if (part === 'anomaly') {
            for (const item in sortingOptionsModel) {
                if (item.value === sortSettings.anomaly) {
                    return item.index
                }
            }
        } else if (part === 'face') {
            for (const item in sortingOptionsModel) {
                if (item.value === sortSettings.face) {
                    return item.index
                }
            }
        } else if (part === 'plate') {
            for (const item in sortingOptionsModel) {
                if (item.value === sortSettings.plate) {
                    return item.index
                }
            }
        } else if (part === 'report') {
            for (const item in sortingOptionsModel) {
                if (item.value === sortSettings.report) {
                    return item.index
                }
            }
        }
    }

    const { sortSettings, setSortSettings } = useStateHeaderContext()
    const [sortOpen, setSortOpen] = useState(false);

    const [sortIndex, setSortIndex] = useState(getCurrentIndexFromState(part, sortSettings));


    function handleRadioChange(index) {
        setSortIndex(index)
    }

    function handleClickSet() {
        let newSortSettings = {}
        if (part === 'anomaly') {
            newSortSettings = { ...sortSettings, anomaly: sortingOptionsModel[sortIndex - 1] }
        } else if (part === 'face') {
            newSortSettings = { ...sortSettings, face: sortingOptionsModel[sortIndex - 1] }
        } else if (part === 'plate') {
            newSortSettings = { ...sortSettings, plate: sortingOptionsModel[sortIndex - 1] }
        } else if (part === 'report') {
            newSortSettings = { ...sortSettings, report: sortingOptionsModel[sortIndex - 1] }
        }
        setSortSettings(newSortSettings)

    }


    return (
        <Popover
            className='px-3'
            overlayStyle={{
                width: "20vw",
            }}
            open={sortOpen}
            onOpenChange={(e) => {
                setSortOpen(e)
            }}
            content={
                <div className='flex flex-col'>
                    <p className='font-semibold'>{`${textHere(TTForms.title_sort_by,lang)}:`}</p>
                    <Radio.Group
                        className='p-5'
                        onChange={(e) => {
                            handleRadioChange(e.target.value)
                        }} value={sortIndex}>
                        <Space direction="vertical">
                            {sortingOptionsModel.map((item) =>
                                <Radio value={item.index}>{item.label}</Radio>
                            )}
                        </Space>
                    </Radio.Group>
                    <Button>
                        {textHere(TTButtons.action_settings,lang)}
                    </Button>
                </div>
            }
        >
            <button onClick={handleClickSet}>
                <div>
                    <div className='flex items-center'>
                        <OrderedListOutlined className='text-2xl' />
                    </div>
                </div>
            </button>
        </Popover>
    );
};

export default SortingPopover;
