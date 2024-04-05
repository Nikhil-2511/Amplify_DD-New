import React, { useEffect, useState } from 'react';
import { getDetails, getValuationValue, isMobileView, isObjectEmpty } from '../../helper/commonHelper';
import { moreDetailsIcon, valuationSvg } from '../../assets/icons/svgIcons';
import InformationBox from '../../CommonComponent/InformationBox';
import DashboardSections from '../DashboardSections';
import { valuationAgency, valuationB2b, valuationD2c, valuationEdTech, valuationFintech, valuationGaming, valuationGeneric, valuationMarketPlace, valuationSaaS } from '../Valuation/ValuationDataJson';
import { AGENCY, ED_TECH, FINTECH, GAMING, MARKET_PLACE, OTHERS, SAAS } from '../../constants';

function ValuationReport({ valuationData, metricData }) {
  const [companyData, setCompanyData] = useState({});
  const isMobileDevice = isMobileView();

  useEffect(() => {
    let businessType = valuationData?.category;
    switch (businessType) {
      case FINTECH:
        setCompanyData(valuationFintech);
        break;
      case SAAS:
        setCompanyData(valuationSaaS);
        break;
      case MARKET_PLACE:
        setCompanyData(valuationMarketPlace);
        break;
      case GAMING:
        setCompanyData(valuationGaming);
        break;
      case OTHERS:
        setCompanyData(valuationGeneric);
        break;
      case ED_TECH:
        setCompanyData(valuationEdTech);
        break;
      case AGENCY:
        setCompanyData(valuationAgency);
        break;
      default:
        setCompanyData(valuationD2c);
    }
  }, [valuationData])

  function getBenchMarkValue(key) {
    if (metricData?.benchmarks && metricData.benchmarks[key]) {
      return metricData.benchmarks[key];
    }
    return '';
  }

  return (
    <div className='valuation-report-container'>
      {
        !isObjectEmpty(valuationData) && !isObjectEmpty(companyData) &&
        <div className='primary-theme valuation-content'>
          {
            !metricData?.notPossibleToCompute &&
            <div className='flex justify-space-between align-center padding-y10 margin-t10'>
              <div className='flex align-center text-30 font-600'>
                <div className='valuation-title-icon'>{valuationSvg}</div>
                Estimated Valuation
              </div>
              <InformationBox content="It's important to note that these are just general guidelines, and there may be other factors that come into play in determining the multiple, such as the strategic value of the acquisition to the buyer, the bargaining power of the seller, and the overall market conditions." bodyPosition={isMobileDevice ? 'default-position':  "top-align-info"} />
            </div>
          }
          {!metricData?.notPossibleToCompute && <div className='text-20 margin-t15'>Based on your inputs, and using our internal benchmarks for companies in your sector, the valuation range for your startup for acquisition is </div>}
          {valuationData?.category !== OTHERS && metricData?.notPossibleToCompute && <div className='text-20 margin-t15'>Since you are a pre-revenue company, we are currently unable to estimate the value of your company based on standard industry metrics. </div>}
          {!metricData?.notPossibleToCompute && <div className='grad-text valuation-amount'>Rs {`${getValuationValue(metricData?.valuation?.min)}`} cr to Rs {`${getValuationValue(metricData?.valuation?.max)}`} cr</div>}
          <div className='section-divider margin-t20 padding-t25'>
            <DashboardSections
              dashboardSectionData={companyData?.moreDetails}
              className="padding-b30 padding-t5"
              labelClass="margin-b10 "
              valuation={valuationData}
              itemFieldClassLabel="text-20"
              defaultOpen={true}
              itemClassLabel="padding-b5 text-26" />
            {/* <div className='flex text-30 font-600'><div className='valuation-title-icon'>{moreDetailsIcon}</div>More Details</div>
            <div className='flex valuation-section'>
              <div className='col-section-divider valuation-col-content'>
                <div className='text-6B6B6B text-26 margin-b10'>Type of start-up</div>
                <div className='text-20'>{valuationData?.category || ''}</div>
              </div>
              <div className='col-section-divider valuation-col-content'>
                <div className='text-6B6B6B text-26 margin-b10'>Years in operation</div>
                <div className='text-20'>2018</div>
              </div>
              <div className=' valuation-col-content'>
                <div className='text-6B6B6B text-26 margin-b10'>Category segment</div>
                <div className='text-20'>{valuationData?.subCategory || ''}</div>
              </div>
            </div> */}
            <div className={'flex valuation-section revenue-section section-divider ' + (isMobileDevice ? 'flex-direction-coloum row-gap-16' : '')}>
              <div className={'col-section-divider first-section-content'}>
                <div className=' text-6B6B6B text-26 margin-b10'>{companyData?.growthColumn?.subSection[0]?.label || ''}</div>
                <div className='text-20'>{getDetails(companyData?.growthColumn?.subSection[0], valuationData)}</div>
              </div>
              <div className='second-section-centent'>
                <div className='text-6B6B6B text-26 margin-b10'>{companyData?.growthColumn?.subSection[1]?.label || ''}</div>
                {
                  companyData?.growthColumn?.subSection[1]?.qk_key === 'amazonRating' &&
                  <div className='rating-conatainer'>
                    <div className='rating-sprite'>
                      <div className='sprite-value' style={{ width: `${(parseFloat(valuationData?.amazonRating > 5 ? 5 : valuationData?.amazonRating) * 20)}%` }}></div>
                    </div>
                  </div>
                }
                {
                  !(companyData?.growthColumn?.subSection[1]?.qk_key === 'amazonRating') &&
                  <div className='text-20'>{getDetails(companyData?.growthColumn?.subSection[1], valuationData)}</div>
                }
              </div>
            </div>
            {
              !metricData?.notPossibleToCompute &&
              <div className={'flex valuation-section section-divider ' + (isMobileDevice ? 'flex-wrap' : '')}>
                {
                  companyData.multiColumn &&
                  companyData.multiColumn.subSection.map((multiColumnData, index) => {
                    return (
                      <div className={'col-section-divider ' + (isMobileDevice ? 'w-full margin-b10' : 'flex-1')} key={index}>
                        <div className='text-6B6B6B text-26 margin-b10'>{multiColumnData.label}</div>
                        <div className='text-20'>{getBenchMarkValue(multiColumnData.qk_key) || '-'}</div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default ValuationReport;