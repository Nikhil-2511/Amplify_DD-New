import React, { useEffect, useState } from 'react';
import QuestionTextArea from '../../../Component/QuestionTextArea';
import { useDispatch } from 'react-redux';
import { fetchLOIDetails } from '../../../Redux/slice/LOISlice';
import { Stack } from '@mui/material';
import DoneDealFormField from '../../../CommonComponent/DoneDealFormField';
import '../LoiForm/style.scss';
import { OutlineButton } from '../../../CommonComponent/CustomButton';
import { deepClone } from '../../../helper/commonHelper';
import CustomDropdown from '../../../CommonComponent/CustomDropdown';
import CustomDatePicker from '../../../CommonComponent/CustomDatepicker';

const initialData = {
    name: '',
    doi: '',
    address: '',
    capTable: '',
    structure: '',
    alternate: '',
    payment: '',
    paymentTimeline: '',
    founderCondition: ''
}

const CaptableInitial = {
    founderName: '', share: ''
}

const FounderConditionInitial = {
    name: '', status: 'check status value'
}

function LOIEditForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState({});
    const [doi, setDoi] = useState(new Date());
    const [address, setAddress] = useState("");
    const [capTable, setCapTable] = useState([CaptableInitial]);
    const [structure, setStructure] = useState(0);
    const [alternate, setAlternate] = useState("");
    const [payment, setPayment] = useState("");
    const [paymentTimeline, setPaymentTimeline] = useState("");
    const [askPrice, setAskPrice] = useState("");
    const [founderCondition, setFounderCondition] = useState([FounderConditionInitial]);



    useEffect(() => {
        getLoiDetails();
    }, [])

    function getLoiDetails() {
        let dataToSend = {
            callback: handleLoiCB
        };
        dispatch(fetchLOIDetails(dataToSend));
    }

    function handleLoiCB(res) {
        if(res.status) {
            updateFormFields();
        }
    }

    function updateFormFields() {

    }

    function handleSubmit() {

    }
    function renderFieldLabel(index, label) {
        return (
            <div className='margin-b10 flex align-center'><span className='form-field-number'>{index}</span>{label}</div>
        )
    }

    function renderRegisterAddress() {
        return (
            <React.Fragment>
                {renderFieldLabel(3, 'Registered Address')}
                <DoneDealFormField 
                    className="rounded-8 primary-theme" 
                    placeholder={"e.g. Done Deal is a trusted space for buyers and sellers. Getting acquired is a key milestone for any business but most founders have no idea where to start and how to make it happen. Donedeal helps simplifying acquisition."} 
                    fullWidth={true}
                    minRows={5}
                    maxRows={6}
                    backgroundColor="#121212"
                    borderRadius={12}
                    multiline={true} 
                    size="small"
                />
            </React.Fragment>
        )
    }

    function renderBusinessComapny() {
        return (
            <React.Fragment>
                {renderFieldLabel(4, 'Business of Company')}
                <DoneDealFormField
                    className="rounded-8"
                    fullWidth={true}
                    fieldsetBgColor="#121212"
                    size = 'small'
                    placeholder="Done Deal" />
            </React.Fragment>
        )
    }

    function handleAddCapTable() {
        let capTab = deepClone(capTable);
        capTab.push(CaptableInitial);
        setCapTable(capTab);
    }

    function renderCapTable() {
        if(capTable && capTable.length) {
            return (
                <div className='captable-container'>
                    {renderFieldLabel(5, 'Latest Cap Table')}
                    <div className='font-500 text-6B6B6B margin-b20'>Details of Founders & other shareholders in the Company along with current shareholding percentage</div>
                    {
                        capTable.map((listItem, index) => {
                            return (
                                <Stack spacing = {3} direction= "row" colGap = {3} rowGap={2} key={'captable' + index} sx={{marginBottom: '16px'}}>
                                        <div className='flex-1'>
                                            <DoneDealFormField
                                                className="rounded-8"
                                                fullWidth={true}
                                                fieldsetBgColor="#121212"
                                                size = 'small'
                                                placeholder="John Doe" />
                                        </div>
                                        <div className='flex-1'>
                                            <DoneDealFormField
                                                className="rounded-8"
                                                fullWidth={true}
                                                fieldsetBgColor="#121212"
                                                size = 'small'
                                                type='percentage'
                                                placeholder="20%" />
                                        </div>
                                    </Stack>
                            )
                        })
                    }
                    <div className='margin-t20'><OutlineButton className="capitalize w-100px" variant="outlined" size="small" onClick={handleAddCapTable}>Add</OutlineButton></div>
                </div>
            )
        }
    }

    function renderStructureAcq() {
        return (
            <div>
                {renderFieldLabel(6, 'Desired Structure of Acquisition')}
                <div className='font-500 text-6B6B6B margin-b20'>100% acquisition, majority sale with remaining shares sold as per fixed timeline.</div>
                <div className='padding-l15'>
                    <DoneDealFormField
                        className="rounded-8"
                        fullWidth={true}
                        fieldsetBgColor="#121212"
                        size = 'small'
                        type="slider"
                        placeholder="Name" />
                </div>
            </div>
        )
    }

    function renderAlternatives() {
        return (
            <div>
                {renderFieldLabel(7, 'If alternatives to above are available, please indicate')}
                <DoneDealFormField
                    className="rounded-8"
                    fullWidth={true}
                    fieldsetBgColor="#121212"
                    size = 'small'
                    placeholder="Open to part sale?" />
            </div>
        )
    }

    function renderPaymentDetails() {
        return (
            <div>
                {renderFieldLabel(8, 'Consideration payment details')}
                <DoneDealFormField
                    className="rounded-8"
                    fullWidth={true}
                    fieldsetBgColor="#121212"
                    size = 'small'
                    placeholder="Select preferred payment" />
            </div>
        )
    }

    function renderPaymentTimeline() {
        return (
            <div>
                {renderFieldLabel(9, 'Payment Timeline')}
                <DoneDealFormField
                    className="rounded-8"
                    fullWidth={true}
                    fieldsetBgColor="#121212"
                    size = 'small'
                    placeholder="Select Timeline" />
            </div>
        )
    }

    function renderAskPrice() {
        return (
            <div>
                {renderFieldLabel(10, 'Ask Price')}
                <DoneDealFormField
                    className="rounded-8"
                    fullWidth={true}
                    fieldsetBgColor="#121212"
                    size = 'small'
                    placeholder="10cr" />
            </div>
        )
    }
    
    function handleAddFounderCondition() {
        let founderConditionArr = deepClone(founderCondition);
        founderConditionArr.push(FounderConditionInitial);
        setFounderCondition(founderConditionArr);
    }

    function handlefounderDropdown(value, index) {
        let founderConditionArr = deepClone(founderCondition);
        if(founderConditionArr[index]) {
            founderConditionArr[index].status = value;
        }
        setFounderCondition(founderConditionArr);
    }

    function handleDatePickerChange(value) {
        setDoi(value);
    }

    function renderFounderCondition() {
        return (
            <div>
                {renderFieldLabel(11, 'Founder employment conditions post acquisition')}
                {
                        founderCondition.map((founderList, index) => {
                            return (
                                <Stack spacing = {3} direction= "row" colGap = {3} rowGap={2} key={'captable' + index} sx={{marginBottom: '16px'}}>
                                        <div className='flex-1'>
                                            <DoneDealFormField
                                                className="rounded-8"
                                                fullWidth={true}
                                                fieldsetBgColor="#121212"
                                                size = 'small'
                                                placeholder="John Doe" />
                                        </div>
                                        <div className='flex-1'>
                                            <CustomDropdown
                                                className="rounded-8"
                                                fullWidth={true}
                                                fieldsetBgColor="#121212"
                                                value={founderList.status}
                                                handleChange={(value) => handlefounderDropdown(value, index)}
                                                size = 'small'
                                                options={['Abc', 'xyz', 'jkl']}
                                                placeholder="Test" />
                                        </div>
                                    </Stack>
                            )
                        })
                    }
                    <div className='margin-t20'><OutlineButton className="capitalize w-100px" variant="outlined" size="small" onClick={handleAddFounderCondition}>Add</OutlineButton></div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='edit-loi-container primary-theme'>
                <h6 className='font-600 text-26 margin-t10 margin-b10'>Letter of Intent</h6>
                <div className='font-500 text-6B6B6B margin-b20'>Fill out the following questions to draft of LOI.</div>
                <form onSubmit={handleSubmit}>
                    <Stack spacing = {3} direction= "row" colGap = {3}>
                        <div className='flex-1'>
                            {renderFieldLabel(1, 'Company Name')}
                            <DoneDealFormField
                                className="rounded-8"
                                fullWidth={true}
                                fieldsetBgColor="#121212"
                                size = 'small'
                                placeholder="Name" />
                        </div>
                        <div className='flex-1'>
                            {renderFieldLabel(2, 'Date of Incorporation')}
                            <CustomDatePicker value={doi} onChange={handleDatePickerChange} />
                        </div>
                    </Stack>
                    <div className='loi-section-divider'></div>
                    {renderRegisterAddress()}
                    
                    <div className='loi-section-divider'></div>

                    {renderBusinessComapny()}

                    <div className='loi-section-divider'></div>

                    {renderCapTable()}

                    <div className='loi-section-divider'></div>

                    {renderStructureAcq()}

                    <div className='loi-section-divider'></div>

                    {renderAlternatives()}

                    <div className='loi-section-divider'></div>
                    {renderPaymentDetails()}
                    <div className='loi-section-divider'></div>
                    {renderPaymentTimeline()}
                    <div className='loi-section-divider'></div>
                    {renderAskPrice()}
                    <div className='loi-section-divider'></div>
                    {renderFounderCondition()}
                </form>
            </div>
        </div>
    )
}

export default LOIEditForm;