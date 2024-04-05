import React from "react";
import MobileCard from "../MobileCard";

export default function MobileCardWrapper({ listData, buildCardData }) {
  let cardModel = buildCardData()
  return (
    <React.Fragment>
      {listData?.length ? (
        listData?.map((item, idx) => {
          return (
            <div className=" list-card-container shadow-md my-3" key={idx}>
              <MobileCard cardData={buildCardData(item)} />
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <div className="text-30 text-344054 font-600 lh-70">
            {cardModel?.noDataTexts?.title}
          </div>
          <div className="text-20 text-667085 lh-30">
          {cardModel?.noDataTexts?.desc}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
